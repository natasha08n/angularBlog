import { Component, OnInit }   from '@angular/core';
import { ActivatedRoute }      from '@angular/router';
import { Subscription }        from 'rxjs/Subscription';

import { User }                from './../../models/user';
import { AuthService }         from './../../authorization/auth.service';
import { Post }                from './../../models/post';
import { PostService }         from './../post.service';

@Component({
    selector: 'app-post-view',
    templateUrl: './post-view.component.html',
    styleUrls: ['./post-view.component.css']
})

export class PostViewComponent implements OnInit {

    public post: Post;
    public user: User;
    private subscription: Subscription;

    constructor(
        private authService: AuthService,
        private postService: PostService,
        private route: ActivatedRoute
    ) {
        this.subscription = authService.user$.subscribe(
            (user) => this.user = user
        );
        this.user = this.authService.getUser();
    }

    ngOnInit() {
        this.getPost();
    }

    getPost() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.postService.getPost(id)
            .subscribe(post => this.post = post);
    }
}