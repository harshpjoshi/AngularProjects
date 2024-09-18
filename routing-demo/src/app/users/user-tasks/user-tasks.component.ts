import { Component, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  userId = input.required<string>();
  userName = input.required<string>();
}


export const resolverUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routeState: RouterStateSnapshot) => {
  const userService = inject(UsersService);
  const userName = userService.users.find(user => user.id === activatedRoute.params['userId'])?.name || '';
  return userName;
}