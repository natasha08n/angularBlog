import { Component, Input, OnInit } from '@angular/core';
import { DatePipe }                 from '@angular/common';

import { Post }                     from './../../../models/post';
import { PostService }              from './../../post.service';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
})

export class PostCreateComponent implements OnInit {
    private post: Post;
    private isCreated: boolean = true;
    private currentDate: number;

    constructor (private postService: PostService, private datePipe: DatePipe) {
    }

    ngOnInit() {
        this.post = new Post();
    }

    createPost(post: Post) {
        post.dateCreate = Date.now();
        post.dateUpdate = Date.now();
        this.postService.createPost(post)
            .subscribe(post => {
                console.log('work event emiiter, new post created successfully', post);
            });
    }

    // transform(date: number): string {
    //     return this.datePipe.transform(date, "yyyy-MM-dd");
    // }
}
