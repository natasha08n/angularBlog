import { Component, Input, OnInit } from '@angular/core';

import { Post }             from './../../../models/post';
import { PostService }      from './../../post.service';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
})

export class PostCreateComponent implements OnInit {
    private post: Post;
    private isCreated: boolean = true;

    constructor (private postService: PostService) {
    }

    ngOnInit() {
        this.post = new Post();
    }

    createPost(post: Post) {
        this.postService.createPost(post)
            .subscribe(post => {
                console.log('work event emiiter, new post created successfully', post);
            });
    }
}
