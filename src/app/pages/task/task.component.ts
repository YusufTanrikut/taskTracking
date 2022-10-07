import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { CommentModel } from "src/app/models/comment.model";
import { TaskModel } from "src/app/models/task.model";
import { UserModel } from "src/app/models/user.model";
import { CommentService } from "src/app/services/comment.service";
import { TaskService } from "src/app/services/task.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'task',
    templateUrl: './task.component.html'
})

export class TaskComponent implements OnInit {
    task: TaskModel;
    user: UserModel;
    comments: any[] = [];
    commentForm: CommentModel = {
        id: 0,
        userName: '',
        comment: '',
        taskId: 0
    };

    isEdit = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private taskService: TaskService,
        private userService: UserService,
        private commentService: CommentService
    ) {}
    
    ngOnInit(): void {
        this.user = this.userService.getActiveUser();

        this.route.params.subscribe(params => {
            const id = Number(params['id']);

            if (id > 0) {
                this.getTask(id);
                this.getComments(id);
            }
        })
    }

    private getTask(id: number) {
        const task = this.taskService.getTask(id);

        this.task = task;

        this.commentForm.userName = this.user.name;
        this.commentForm.taskId = this.task.id;
    }

    private getComments(id: number) {
        const comments: any[] = this.commentService.getTaskComments(id);
        this.comments = comments;
    }

    editTask() {
        this.router.navigate(['/task/edit', this.task.id]);
    }

    addComment() {
        this.commentService.addComment(this.commentForm);
        this.getComments(this.task.id);

        this.commentForm.id = 0;
        this.commentForm.comment = '';
    }

    back() {
        this.router.navigate(['/tabs']);
    }
}