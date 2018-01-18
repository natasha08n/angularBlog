import { Component, Input } from '@angular/core';
import { MatDialog }        from '@angular/material';
import { Router }           from '@angular/router';

import { Post }             from './../../../../shared/models/post';
import { DeleteComponent }  from './../../delete/delete.component';
import { PostService }      from '../../post.service';

@Component({
    selector: 'app-edit-delete',
    templateUrl: './edit-delete.component.html',
    styleUrls: ['./edit-delete.component.css']
})

export class EditDeleteComponent {
    @Input() postId: Number;

    public pageSize: number;
    public pageIndex: number;

    constructor(
        public dialog: MatDialog,
        private postService: PostService,
        private router: Router
    ) {
        this.pageSize = this.postService.pageSize;
        this.pageIndex = this.postService.pageIndex;
    }

    openDialogDelete(postId: number): void {
        const dialogRefDelete = this.dialog.open(DeleteComponent, {
            width: '350px',
            data: { id: postId }
        });

        dialogRefDelete.afterClosed().subscribe(result => {
            if (result) {
                this.postService.deletePost(postId)
                    .subscribe(res => {
                        if (res['status'] === true) {
                            this.postService.getPosts(this.pageSize, this.pageIndex);
                            this.router.navigateByUrl('');
                        }
                    });
            }
        });
    }
}
