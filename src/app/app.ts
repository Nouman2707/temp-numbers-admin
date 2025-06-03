import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NumberListComponent } from './components/number-list/number-list';
import { FilterComponent } from './components/filter/filter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NumberListComponent, FilterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  protected title = 'frontend';
  protected selectedStatus: string = 'All';

  onStatusChange(status: string) {
    this.selectedStatus = status;
  }
}
