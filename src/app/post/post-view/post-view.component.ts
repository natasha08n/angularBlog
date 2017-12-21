import { Component, OnInit }   from '@angular/core';
import { ActivatedRoute }      from '@angular/router';

import { Post }                from './../../models/post';
import { PostService }         from './../post.service'

@Component({
    selector: 'app-post-view',
    templateUrl: './post-view.component.html',
    styleUrls: ['./post-view.component.css']
})

export class PostViewComponent implements OnInit {

    public post: Post;

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