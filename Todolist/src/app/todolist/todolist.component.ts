import { Component,Input } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent {
  @Input() tasks: any[]=[];

  constructor(private api:BackendService) {}

  toggleTaskStatus(task: any): void {
    this.api.updateTask(task).subscribe(() => {
      this.api.getTasks().subscribe((tasks) => {
        this.tasks = tasks;
      });
    });
  }

  deleteTask(taskId: string): void {
    this.api.deleteTask(taskId).subscribe(() => {
      this.api.getTasks().subscribe((tasks) => {
        this.tasks = tasks;
      });
    });
  }
}
