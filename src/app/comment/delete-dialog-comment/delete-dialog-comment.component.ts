import { Component, Inject, Output }       from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef }   from '@angular/material';
import { EventEmitter }                    from 'events';

import { CommentService }                  from './../comments.service';

@Component({
    selector: 'app-delete-dialog-comment',
    templateUrl: './delete-dialog-comment.component.html',
    styleUrls: ['./delete-dialog-comment.component.css']
})

export class DeleteDialogCommentComponent {
    @Output() getComments = new EventEmitter();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Object,
        public dialogRefDelete: MatDialogRef<DeleteDialogCommentComponent>,
        private commentService: CommentService
    ) { }

    deleteComment(commentId: number, postId: number) {
        console.log('postId', postId);
        this.commentService.deleteComment(commentId)
            .subscribe((res) => {
                if(res['status'] === 'success') {
                    this.onNoClick();
                    this.getComments.emit(postId.toString());
                }
            });
    }

    onNoClick() {
        this.dialogRefDelete.close();
    }
}