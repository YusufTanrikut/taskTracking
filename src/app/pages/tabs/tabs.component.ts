import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommentModel } from "src/app/models/comment.model";
import { TaskModel } from "src/app/models/task.model";
import { CommentService } from "src/app/services/comment.service";
import { TaskService } from "src/app/services/task.service";

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html'
})

export class TabsComponent implements OnInit {
    comments: CommentModel[] = [];
    tasks: TaskModel[] = [];

    filteredComments: CommentModel[] = [];

    filterWord = '';

    selectedIndex = 0;

    constructor(
        private router: Router,
        private commentService: CommentService,
        private taskService: TaskService
    ) {}
    
    ngOnInit(): void {
        this.getComments();
        this.getTasks();
    }

    goHome() {
        this.router.navigate(['']);
    }

    openComment(id: number) {
        this.router.navigate(['/comment/edit', id]);
    }

    openTask(id: number) {
        this.router.navigate(['/task', id]);
    }

    selectTab(index: number) {
        this.selectedIndex = index;
    }

    getComments() {
        const comments = this.commentService.getComments();
        this.comments = comments;
        this.filteredComments = comments;
    }

    getTasks() {
        const tasks = this.taskService.getTasks();
        this.tasks = tasks;
    }

    filterComments() {
        if (this.filterWord.trim() == '')
            this.filteredComments = this.comments;
        else
            this.filteredComments = this.comments.filter(o => o.comment.includes(this.filterWord));
    }

    addTask() {
        this.router.navigate(['/task/edit', 0]);
    }
}