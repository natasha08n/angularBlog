import { Component }    from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Post }         from './../../models/post';
import { PostService }  from '../post.service';
import { scheduleMicroTask } from '@angular/core/src/util';

@Component({
    selector: 'app-recent-posts',
    templateUrl: './recent-posts.component.html',
    styleUrls: ['./recent-posts.component.css']
})

export class RecentPostsComponent {
    public posts: Post[];
    private subscription: Subscription;
    private recentPostLength: number = 15;

    constructor(private postService: PostService) {
        this.subscription = postService.posts$.subscribe(
            (posts) => {
                this.posts = posts;
                this.getRecentPosts();
            }
        );
    }

    getRecentPosts(): void {
        this.posts.sort((a, b) => {
            if(a.comments < b.comments) {
                return 1;
            } else if(a.comments > b.comments) {
                return -1;
            } else {
                return 0;
            }
        });
        this.posts = this.posts.slice(0, 5);
        this.posts.forEach((post) => {
            post.excerpt = post.excerpt.split(/\s+/).slice(0, this.recentPostLength).join(' ');
        });
    }
}