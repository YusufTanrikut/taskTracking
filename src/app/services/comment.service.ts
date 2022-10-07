import { NgModule } from "@angular/core";
import { CommentModel } from "../models/comment.model";

@NgModule({})

export class CommentService {
    public getComments(): CommentModel[] {
        let result: CommentModel[] = [];

        const comments = localStorage.getItem('comments');
        if (comments != null)
            result = JSON.parse(comments);

        return result;
    }

    public setComments(comments: CommentModel[]): void {
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    public addComment(comment: CommentModel): void {
        const comments = this.getComments();
        
        comment.id = comments.length + 1;
        comments.push(comment);

        this.setComments(comments);
    }

    public getComment(id: number): CommentModel {
        const comment = this.getComments().find(o => o.id == id);
        
        if (comment == null)
            return {} as CommentModel;

        return comment;
    }

    public getTaskComments(taskId: number): CommentModel[] {
        const comments = this.getComments().filter(o => o.taskId == taskId);
        
        if (comments == null)
            return [];

        return comments;
    }

    public deleteTaskComments(taskId: number) {
        const comments = this.getComments().filter(o => o.taskId != taskId);
        this.setComments(comments);
    }

    public updateComment(comment: CommentModel): void {
        const comments = this.getComments();
        const commentIndex = comments.findIndex(o => o.id == comment.id);
        
        comments[commentIndex] = comment;
        
        this.setComments(comments);
    }
}