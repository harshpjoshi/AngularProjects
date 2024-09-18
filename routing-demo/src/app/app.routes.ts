import { Routes } from "@angular/router";
import { resolveUserTasks, TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolverUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent
    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        children: [
            {
                path: '',
                redirectTo: 'tasks',
                pathMatch: 'full'
            },
            {
                path: 'tasks',
                component: TasksComponent,
                runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                resolve: {
                    userTasks: resolveUserTasks
                }
            },
            {
                path: 'tasks/new',
                component: NewTaskComponent
            }
        ],
        resolve: {
            userName: resolverUserName,
        }
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];