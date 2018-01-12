import { Component, Input }             from '@angular/core';
import { MatDialog }                    from '@angular/material';

import { DeleteDialogCommentComponent } from './../delete-dialog-comment/delete-dialog-comment.component';
import { CommentService }               from '../comments.service';

@Component({
    selector: 'app-comment-view',
    templateUrl: './comment-view.component.html',
    styleUrls: ['/comment-view.component.css']
})

export class CommentViewComponent {
    @Input() comment: Comment;
    @Input() userId: number;

    private dialogRefDelete;
    public isShown: boolean = false;
    public countClicks: number = 0;

    constructor(
        public dialog: MatDialog,
        private commentService: CommentService
    ) { }

    openDialogDelete(commentId: number, postId: number): void {
        const dialogRefDelete = this.dialog.open(DeleteDialogCommentComponent, {
            width: '350px',
            data: {
                commentId: commentId,
                postId: postId
            }
        });

        dialogRefDelete.afterClosed().subscribe(result => {
            if (result) {
                this.commentService.deleteComment(commentId)
                    .subscribe((res) => {
                        if (res['status'] === 'success') {
                            this.commentService.getCommentsPost(postId);
                        }
                });
            }
        });
    }

    showFormComment() {
        if (this.countClicks % 2 === 0) {
            this.isShown = false;
        } else {
            this.isShown = true;
        }
        this.countClicks++;
    }
}
