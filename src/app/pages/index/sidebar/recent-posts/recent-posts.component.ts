import { Component }            from '@angular/core';

import { Post }                 from './../../../../shared/models/post';
import { PostService }          from './../../../../modules/post/post.service';

@Component({
    selector: 'app-recent-posts',
    templateUrl: './recent-posts.component.html',
    styleUrls: ['./recent-posts.component.css']
})

export class RecentPostsComponent {
    public posts: Post[];
    private recentPostLength: number = 15;

    constructor(private postService: PostService) {
        this.postService.getAllPosts()
            .subscribe((posts) => {
                this.posts = posts;
                this.getRecentPosts();
            });
    }

    getRecentPosts(): void {
        this.posts.sort((a, b) => {
            if (a.comments < b.comments) {
                return 1;
            } else if (a.comments > b.comments) {
                return -1;
            } else {
                return 0;
            }
        });
        this.posts = this.posts.slice(0, 5);
    }
}
