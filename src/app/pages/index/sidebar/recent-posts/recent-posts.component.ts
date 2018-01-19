import { Component }            from '@angular/core';
import { Subscription }         from 'rxjs/Subscription';

import { Post }                 from './../../../../shared/models/post';
import { PostService }          from './../../../../modules/post/post.service';

@Component({
    selector: 'app-recent-posts',
    templateUrl: './recent-posts.component.html',
    styleUrls: ['./recent-posts.component.css']
})

export class RecentPostsComponent {
    public posts: Post[];
    private subscription: Subscription;

    constructor(private postService: PostService) {
        this.subscription = postService.posts$.subscribe(
            (posts) => {
              this.posts = posts;
              this.getRecentPosts(this.posts);
              this.subscription.unsubscribe();
            });
    }

    getRecentPosts(posts): void {
        posts.sort((a, b) => {
            if (a.comments < b.comments) {
                return 1;
            } else if (a.comments > b.comments) {
                return -1;
            } else {
                return 0;
            }
        });
        this.posts = posts.slice(0, 5);
    }
}
