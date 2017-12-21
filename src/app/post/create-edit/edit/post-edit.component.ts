import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute }           from '@angular/router';

import { Post }                     from './../../../models/post';
import { PostService }              from './../../post.service';

@Component({
    selector: 'app-post-edit',
    templateUrl: './post-edit.component.html'
})

export class PostEditComponent implements OnInit {
    post: Post;

    constructor(
        private postService: PostService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.getPost();
    }

    getPost() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.postService.getPost(id)
            .subscribe(post => this.post = post);
    }
}
