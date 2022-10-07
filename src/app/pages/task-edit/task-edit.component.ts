import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskModel } from "src/app/models/task.model";
import { UserModel } from "src/app/models/user.model";
import { CommentService } from "src/app/services/comment.service";
import { TaskService } from "src/app/services/task.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'task-edit',
    templateUrl: './task-edit.component.html'
})

export class TaskEditComponent implements OnInit {
    taskRequest: TaskModel = {
        id: 0,
        addedDate: new Date,
        title: '',
        assignedUserId: 0,
        description: ''
    };

    users: UserModel[] = [];

    isNew = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private taskService: TaskService,
        private userService: UserService,
        private commentService: CommentService
    ) {}
    
    ngOnInit(): void {
        this.users = this.userService.getUsers();

        this.route.params.subscribe(params => {
            this.taskRequest.id = Number(params['id']);
            if (this.taskRequest.id > 0) {
                this.isNew = false;
                this.getTask(this.taskRequest.id);
            }
         });
    }

    private getTask(id: number) {
        const result = this.taskService.getTask(id);
        this.taskRequest = result;
    }

    addTask() {
        this.taskService.addTask(this.taskRequest);
        this.back();
    }

    deleteTask() {
        this.taskService.deleteTask(this.taskRequest.id);
        this.commentService.deleteTaskComments(this.taskRequest.id);
        this.back();
    }

    updateTask() {
        this.taskService.updateTask(this.taskRequest);
        this.back();
    }

    back() {
        this.router.navigate(['/tabs']);
    }
}