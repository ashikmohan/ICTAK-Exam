import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  newTaskDescription = '';

  constructor(private api: BackendService) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.api.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });
  }

  applyFilter(filterType: string): void {
    if (filterType === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.status === 'completed');
    } else if (filterType === 'ongoing') {
      this.filteredTasks = this.tasks.filter(task => task.status === 'ongoing');
    } else {
      this.filteredTasks = this.tasks;
    }
  }

  addTask(): void {
    console.log('Adding new task...');
    if (this.newTaskDescription) {
      const newTask = {
        description: this.newTaskDescription,
        status: 'ongoing'
      };

      this.api.addTask(newTask).subscribe(() => {
        this.newTaskDescription = '';
        this.fetchTasks();
      },
      (error) => {
        console.error('Error adding task:', error);
      }
      );
    }
  }
}
