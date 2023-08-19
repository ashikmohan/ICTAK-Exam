import { Component,EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() filterApplied = new EventEmitter<string>();

  applyFilter(filterType: string): void {
    this.filterApplied.emit(filterType);
  }
}
