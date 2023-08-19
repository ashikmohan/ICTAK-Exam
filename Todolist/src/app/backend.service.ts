import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`);
  }

  addTask(task: any) {
    return this.http.post(`${this.apiUrl}/tasks`, task);
  }

  updateTask(task: any) {
    return this.http.put(`${this.apiUrl}/tasks/${task._id}`, task);
  }

  deleteTask(taskId: string) {
    return this.http.delete(`${this.apiUrl}/tasks/${taskId}`);
  }
}
