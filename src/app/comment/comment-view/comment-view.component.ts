import { Component, Input }             from '@angular/core';
import { MatDialog }                    from '@angular/material';

import { DeleteDialogCommentComponent } from './../delete-dialog-comment/delete-dialog-comment.component';

@Component({
    selector: 'app-comment-view',
    templateUrl: './comment-view.component.html',
    styleUrls: ['/comment-view.component.css']
})

export class CommentViewComponent {
    @Input() comment: Comment;
    @Input() userId: number;

    constructor(public dialog: MatDialog) { }

    openDialogDelete(commentId: number, postId: number): void {
        const dialogRefDelete = this.dialog.open(DeleteDialogCommentComponent, {
            width: '350px',
            data: {
                commentId: commentId,
                postId: postId
            }
        });
    }
    
}