import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  taskId!: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // ✅ Step 1: Always initialize the form first
    this.form = this.fb.group({
      title: ['', Validators.required],
      completed: [false]
    });

    // ✅ Step 2: Handle edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskId = +id;
      const task = this.taskService.getLocalTasks().find(t => t.id === this.taskId);
      if (task) {
        this.form.patchValue(task);
      }
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const task = {
      ...this.form.value,
      id: this.taskId,
      userId: 1
    };

    const action = this.isEditMode
      ? this.taskService.updateTask(task)
      : this.taskService.addTask(task);

    action.subscribe(() => this.router.navigate(['/tasks']));
  }
}
