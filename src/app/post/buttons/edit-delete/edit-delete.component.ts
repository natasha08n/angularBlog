import { Component, Input } from '@angular/core';
import { MatDialog }        from '@angular/material';
import { Router }           from '@angular/router';

import { Post }             from './../../../models/post';
import { DeleteComponent }  from './../../delete-dialog/delete.component';
import { PostService }      from '../../post.service';

@Component({
    selector: 'app-edit-delete',
    templateUrl: './edit-delete.component.html',
    styleUrls: ['./edit-delete.component.css']
})

export class EditDeleteComponent {
    @Input() postId: Number;

    constructor(
        public dialog: MatDialog,
        private postService: PostService,
        private router: Router
    ) { }

    openDialogDelete(postId: number): void {
        const dialogRefDelete = this.dialog.open(DeleteComponent, {
            width: '350px',
            data: { id: postId }
        });

        dialogRefDelete.afterClosed().subscribe(result => {
            if(result) {
                this.postService.deletePost(postId)
                    .subscribe(res => {
                        if(res['status'] === 'success') {
                            this.postService.getAllPosts();
                            this.router.navigateByUrl('');
                        }
                    });
            }
        })
    }
}