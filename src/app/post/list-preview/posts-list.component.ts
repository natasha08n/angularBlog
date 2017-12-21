import { Component }   from '@angular/core';

import { Post }        from './../../models/post';
import { PostService } from  './../post.service';
import { PostPreviewComponent } from './post-preview.component';

@Component({
    selector: 'app-posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.css']
})

export class PostsListComponent {
    posts: Post[];

    constructor(private postService: PostService) {
        this.postService.getAllPosts()
            .subscribe(posts => {
                this.posts = posts;
            });
    }
}
