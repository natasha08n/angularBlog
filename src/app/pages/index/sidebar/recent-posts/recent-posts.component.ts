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

    constructor(private postService: PostService) {
        this.postService.getPosts()
            .subscribe((posts) => {
                this.getRecentPosts(posts);
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
