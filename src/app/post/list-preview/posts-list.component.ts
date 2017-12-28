import { Component }            from '@angular/core';
import { OnInit }               from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription }         from 'rxjs/Subscription';
import { ActivatedRoute }       from '@angular/router';
import { Subject }              from 'rxjs/Subject';

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

    constructor(
        private postService: PostService,
        private route: ActivatedRoute
    ) {
        this.subscription = postService.posts$.subscribe(
            (posts) => this.posts = posts
           );
    }

    ngOnInit() {
        const tagname = this.route.snapshot.paramMap.get('tag');
        if(tagname) {
            this.getPostsByTag(tagname);
        } else {
            this.getPosts();
        }
    }

    getPosts(): void {
        this.postService.getAllPosts()
            .subscribe(posts => {
                this.posts.next(posts);
            });
    }

    getPostsByTag(tagname: string): void {
        this.postService.getPostsByTag(tagname)
            .subscribe(posts => {
                this.posts = posts;
                this.postService.
            });
    }
}
