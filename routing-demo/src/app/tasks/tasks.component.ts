import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>();
  // order = input<'asc' | 'desc'>('asc');

  order = input<'asc' | 'desc' | undefined>();


  userTasks = input.required<Task[]>();
}

export const resolveUserTasks: ResolveFn<Task[]> = (activatedRoute: ActivatedRouteSnapshot, routeState: RouterStateSnapshot) => {
  const order = activatedRoute.queryParams['order'] || 'desc';
  const taskService = inject(TasksService);

  return taskService.allTasks().filter(task => task.userId === activatedRoute.params['userId']).sort((a, b) => {
    if (order === 'desc') {
      return a.id > b.id ? -1 : 1;
    } else {
      return a.id > b.id ? 1 : -1;
    }
  });
};
