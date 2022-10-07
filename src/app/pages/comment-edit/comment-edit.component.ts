import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommentModel } from "src/app/models/comment.model";
import { TaskModel } from "src/app/models/task.model";
import { UserModel } from "src/app/models/user.model";
import { CommentService } from "src/app/services/comment.service";
import { TaskService } from "src/app/services/task.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'comment-edit',
    templateUrl: './comment-edit.component.html'
})

export class CommentEditComponent implements OnInit {
    commentRequest: CommentModel = {
        id: 0,
        taskId: 0,
        comment: '',
        userName: ''
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private commentService: CommentService
    ) {}
    
    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.commentRequest.id = Number(params['id']);
            if (this.commentRequest.id > 0) {
                this.getComment(this.commentRequest.id);
            }
         });
    }

    private getComment(id: number) {
        const result = this.commentService.getComment(id);
        this.commentRequest = result;
    }

    updateComment() {
        this.commentService.updateComment(this.commentRequest);
        this.back();
    }

    goTask() {
        this.router.navigate(['/task', this.commentRequest.taskId]);
    }

    back() {
        this.router.navigate(['/tabs']);
    }
}