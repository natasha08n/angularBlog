import { Component, Input, OnInit } from '@angular/core';
import { DatePipe }                 from '@angular/common';
import { Router }                   from '@angular/router';

import { Post }                     from './../../../models/post';
import { PostService }              from './../../post.service';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
})

export class PostCreateComponent implements OnInit {
    private post: Post;
    private isCreated: boolean = true;

    constructor (
        private postService: PostService,
        private router: Router,
        private datePipe: DatePipe) {
    }

    ngOnInit() {
        this.post = new Post();
    }

    createPost(post: Post) {
        console.log('create eee');
        post.dateCreate = Date.now();
        post.dateUpdate = Date.now();
        this.postService.createPost(post)
            .subscribe(id => {
                console.log('work event emiiter, new post created successfully', id);
                this.router.navigate(['/post', id]);
            });
    }

    // transform(date: number): string {
    //     return this.datePipe.transform(date, "yyyy-MM-dd");
    // }
}
