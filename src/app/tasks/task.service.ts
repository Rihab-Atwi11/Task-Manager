import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task.model';
import { Observable } from 'rxjs';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private tasks: Task[] = []; // ✅ local task list

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      tap(data => this.tasks = data)
    );
  }

  // Local simulation of POST
  addTask(task: Task): Observable<Task> {
    task.id = this.tasks.length ? Math.max(...this.tasks.map(t => t.id ?? 0)) + 1 : 1;
    this.tasks.push(task);
    return of(task); // simulate success response
  }

  deleteTask(id: number): void {
  this.tasks = this.tasks.filter(t => t.id !== id);
}

updateTask(task: Task): Observable<Task> {
  const index = this.tasks.findIndex(t => t.id === task.id);
  if (index !== -1) this.tasks[index] = task;
  return of(task); // simulate success
}

getLocalTasks(): Task[] {
  return this.tasks;
}
}
