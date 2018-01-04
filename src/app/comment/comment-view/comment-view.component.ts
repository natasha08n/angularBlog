import { Component, Input, Output }     from '@angular/core';
import { MatDialog }                    from '@angular/material';
import { EventEmitter }                 from '@angular/core';

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
   
    @Output() reply = new EventEmitter();

    private dialogRefDelete;

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
            if(result) {
                this.commentService.deleteComment(commentId)
                    .subscribe((res) => {
                        if(res['status'] === 'success') {
                            this.commentService.getCommentsPost(postId);
                        }
                });
            }
        });
    }

    replyTo(author: string) {
        this.reply.emit(author);
    }
}
