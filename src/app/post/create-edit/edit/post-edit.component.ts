import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';

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
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.getPost();
    }

    getPost() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.postService.getPost(id)
            .subscribe(post => this.post = post);
    }

    editPost(post: Post): void {
        console.log('try edit');
        post.dateUpdate = Date.now();
        this.postService.editPost(post)
            .subscribe(res => {
                console.log('received message', res);
                this.router.navigate(['/']);
            });
    }
}
