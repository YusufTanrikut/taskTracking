import { NgModule } from "@angular/core";
import { TaskModel } from "../models/task.model";

@NgModule({})

export class TaskService {
    public getTasks(): TaskModel[] {
        let result: TaskModel[] = [];

        const tasks = localStorage.getItem('tasks');
        if (tasks != null)
            result = JSON.parse(tasks);

        return result;
    }

    public setTasks(tasks: TaskModel[]): void {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    public addTask(task: TaskModel): void {
        const tasks = this.getTasks();
        
        task.id = tasks.length + 1;
        tasks.push(task);

        this.setTasks(tasks);
    }

    public getTask(id: number): TaskModel {
        const task = this.getTasks().find(o => o.id == id);
        
        if (task == null)
            return {} as TaskModel;

        return task;
    }

    public deleteTask(id: number): boolean {
        const tasks = this.getTasks().filter(o => o.id != id);

        this.setTasks(tasks);

        return true;
    }

    public updateTask(task: TaskModel): void {
        const tasks = this.getTasks();
        const taskIndex = tasks.findIndex(o => o.id == task.id);
        
        tasks[taskIndex] = task;
        
        this.setTasks(tasks);
    }
}