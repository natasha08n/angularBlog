import { Component }    from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Post }         from './../../models/post';
import { PostService }  from './../../post/post.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html'
})

export class MainPageComponent { 
    public posts: Post[];
    private subscription: Subscription;
  
    constructor(private postService: PostService) {
        this.subscription = postService.posts$.subscribe(
            (posts) => this.posts = posts
        );
        this.getPosts();
        console.log('in the main page');
    }
  
    getPosts(): void {
      this.postService.getAllPosts()
        .subscribe(posts => this.posts = posts);
    }
}