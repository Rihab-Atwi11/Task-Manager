import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    const localTasks = this.taskService.getLocalTasks();
    if (localTasks.length) {
      this.tasks = localTasks;
      this.loading = false;
    } else {
      this.taskService.getTasks().subscribe(data => {
        this.tasks = data;
        this.loading = false;
      });
    }
  }

  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.taskService.deleteTask(id);
    }
  }
}
