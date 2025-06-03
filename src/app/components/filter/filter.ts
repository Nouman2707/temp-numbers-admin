import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.html',
  styleUrls: ['./filter.scss']
})
export class FilterComponent {
  @Output() statusChange = new EventEmitter<string>();
  selectedStatus: string = 'All';
  statuses: string[] = ['All', 'active', 'inactive'];

  onStatusChange(status: string) {
    this.selectedStatus = status;
    this.statusChange.emit(status);
  }
}
