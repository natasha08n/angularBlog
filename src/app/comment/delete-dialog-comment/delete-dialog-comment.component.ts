import { Component, Inject, Output }       from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef }   from '@angular/material';
import { EventEmitter }                    from 'events';

import { CommentService }                  from './../comments.service';

@Component({
    selector: 'app-delete-dialog-comment',
    templateUrl: './delete-dialog-comment.component.html',
    styleUrls: ['./delete-dialog-comment.component.css']
})

export class DeleteDialogCommentComponent { }
