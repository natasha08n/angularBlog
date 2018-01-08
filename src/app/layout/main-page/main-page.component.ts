import { Component }    from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PageEvent }    from '@angular/material';

import { Post }         from './../../models/post';
import { PostService }  from './../../post/post.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html'
})

export class MainPageComponent {
    public posts: Post[];
    private subscription: Subscription;

    public length: number = 0;
    public pageSize: number = 5;
    public pageSizeOptions: number[] = [5, 10, 25, 100];
    public pageIndex: number = 0;

    pageEvent: PageEvent;

    constructor(private postService: PostService) {
        this.subscription = postService.posts$.subscribe(
            (posts) => this.posts = posts
        );
        this.getPostsCount();
        this.getPosts();
    }

    getPosts(): void {
      this.postService.getPosts(this.pageSize, this.pageIndex)
        .subscribe(posts => {
            this.posts = posts;
        });
    }

    getPostsCount(): void {
        this.postService.getPostsCount()
            .subscribe(count => {
                this.length = count[0]['count'];
            });
    }

    public getServerData(event: PageEvent) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.getPosts();
    }
}
