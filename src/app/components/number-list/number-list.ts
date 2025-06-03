import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NumberService } from '../../services/number';
import { PhoneNumber } from '../../models/number';

@Component({
  selector: 'app-number-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './number-list.html',
  styleUrls: ['./number-list.scss']
})
export class NumberListComponent implements OnInit, OnChanges {
  @Input() selectedStatus: string = 'All';
  numbers: PhoneNumber[] = [];
  filteredNumbers: PhoneNumber[] = [];
  loading: boolean = true;
  error: string = '';
  updatingStatus: { [key: number]: boolean } = {}; // Track status updates for each number
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  Math = Math; // Make Math available in template

  constructor(private numberService: NumberService) {}

  ngOnInit() {
    this.loadNumbers();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedStatus']) {
      this.filterNumbers();
    }
  }

  loadNumbers() {
    this.loading = true;
    this.error = '';
    this.numberService.getNumbers().subscribe({
      next: (data) => {
        this.numbers = data;
        this.filterNumbers();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading numbers:', error);
        this.error = 'Failed to load phone numbers. Please try again later.';
        this.loading = false;
      }
    });
  }

  filterNumbers() {
    this.filteredNumbers = this.selectedStatus === 'All'
      ? this.numbers
      : this.numbers.filter(num => num.status === this.selectedStatus);
    
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredNumbers.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  get paginatedNumbers(): PhoneNumber[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredNumbers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onItemsPerPageChange(newValue: number) {
    this.itemsPerPage = newValue;
    this.currentPage = 1;
    this.updatePagination();
  }

  getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of visible pages
      let startPage = Math.max(2, this.currentPage - 1);
      let endPage = Math.min(this.totalPages - 1, this.currentPage + 1);
      
      // Adjust if at the start
      if (this.currentPage <= 3) {
        endPage = 4;
      }
      
      // Adjust if at the end
      if (this.currentPage >= this.totalPages - 2) {
        startPage = this.totalPages - 3;
      }
      
      // Add ellipsis and pages
      if (startPage > 2) {
        pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < this.totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(this.totalPages);
    }
    
    return pages;
  }

  isPageNumber(page: number | string): page is number {
    return typeof page === 'number';
  }

  handlePageClick(page: number | string): void {
    if (this.isPageNumber(page)) {
      this.changePage(page);
    }
  }

  toggleStatus(number: PhoneNumber) {
    if (this.updatingStatus[number.id]) {
      return; // Prevent multiple clicks while updating
    }

    const newStatus = number.status === 'active' ? 'inactive' : 'active';
    this.updatingStatus[number.id] = true;

    this.numberService.updateNumberStatus(number.id, newStatus).subscribe({
      next: (updatedNumber) => {
        const index = this.numbers.findIndex(n => n.id === number.id);
        if (index !== -1) {
          this.numbers[index] = updatedNumber;
          this.filterNumbers();
        }
        this.updatingStatus[number.id] = false;
      },
      error: (error) => {
        console.error('Error updating number status:', error);
        this.error = 'Failed to update status. Please try again.';
        this.updatingStatus[number.id] = false;
        
        // Revert the status in the UI if the update failed
        const index = this.numbers.findIndex(n => n.id === number.id);
        if (index !== -1) {
          this.numbers[index] = { ...number }; // Restore original number
          this.filterNumbers();
        }
      }
    });
  }

  isUpdating(number: PhoneNumber): boolean {
    return this.updatingStatus[number.id] || false;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
