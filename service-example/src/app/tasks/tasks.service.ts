import { Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    private tasks = signal<Task[]>([]);

    allTasks = this.tasks.asReadonly();


    addTask(taskData: { title: string, description: string }) {
        const newTask: Task = {
            ...taskData,
            id: Math.random().toString(),
            status: 'OPEN'
        };
        this.tasks.update(tasks => [...tasks, newTask]);
    }

    updateTaskStatus(taskId: string, status: TaskStatus) {
        this.tasks.update(updatedTasks => updatedTasks.map((task) => task.id === taskId ? { ...task, status } : task));
    }
}