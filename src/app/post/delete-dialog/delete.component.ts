import { Component, Inject }             from '@angular/core';
import { EventEmitter, Output }          from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Post }                          from './../../models/post';
import { PostService }                   from './../post.service';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})

export class DeleteComponent {
    public posts: Post[];
    

    constructor(
        private postService: PostService,
        public dialogRefDelete: MatDialogRef<DeleteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    onNoClick(): void {
        this.dialogRefDelete.close();
    }

    deletePost(id: number) {

        this.postService.deletePost(id)
            .subscribe(res => {
                if(res['status'] === 'success') {
                    this.getPosts();
                    this.onNoClick();
                }
            });
    }

    getPosts(): void {
        this.postService.getAllPosts()
            .subscribe(posts => {
                this.posts = posts;
            });
    }
}