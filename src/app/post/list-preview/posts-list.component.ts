import { Component }            from '@angular/core';
import { OnInit }               from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription }         from 'rxjs/Subscription';

import { Post }                 from './../../models/post';
import { PostService }          from  './../post.service';
import { PostPreviewComponent } from './post-preview.component';


@Component({
    selector: 'app-posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.css']
})

export class PostsListComponent implements OnInit {
    posts: Post[];
    subscription: Subscription;

    constructor(private postService: PostService) {
        this.subscription = postService.posts$.subscribe(
            (posts) => this.posts = posts
           );
    }

    ngOnInit() {
        this.getPosts();
        
    }

    getPosts(): void {
        this.postService.getAllPosts()
            .subscribe(posts => {
                this.posts = posts;
            });
    }
}
