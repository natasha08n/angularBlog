import { Component, Input } from '@angular/core';
import { MatDialog }        from '@angular/material';

import { Post }             from './../../../models/post';
import { DeleteComponent }  from './../../delete-dialog/delete.component';

@Component({
    selector: 'app-edit-delete',
    templateUrl: './edit-delete.component.html',
    styleUrls: ['./edit-delete.component.css']
})

export class EditDeleteComponent {
    @Input() postId: Number;

    constructor(public dialog: MatDialog) { }

    openDialogDelete(postId: number): void {
        const dialogRefDelete = this.dialog.open(DeleteComponent, {
            width: '350px',
            data: { id: postId }
        });
    }
}