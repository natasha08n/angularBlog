import { Component, OnDestroy } from '@angular/core';
import { Subscription }         from 'rxjs/Subscription';
import { PageEvent }            from '@angular/material';

import { Post }                 from './../../../../shared/models/post';
import { PostService }          from './../../../../modules/post/post.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html'
})

export class MainPageComponent implements OnDestroy {
    public posts: Post[];
    private subscription: Subscription;

    public length: number;
    public pageSize: number;
    public pageSizeOptions: number[];
    public pageIndex: number;

    pageEvent: PageEvent;

    constructor(private postService: PostService) {

        this.length = this.postService.length;
        this.pageSize = this.postService.pageSize;
        this.pageSizeOptions = this.postService.pageSizeOptions;
        this.pageIndex = this.postService.pageIndex;

        this.subscription = postService.posts$.subscribe(
            (posts) => this.posts = posts
        );
        this.subscription = postService.postsCount$.subscribe(
            (count) => this.length = count
        );

        this.getPosts(this.pageSize, this.pageIndex);
    }

    getPosts(pageSize: number, pageIndex: number): void {
      this.postService.getPosts(pageSize, pageIndex);
    }

    public getPaginationInfo(event: PageEvent) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.getPosts(this.pageSize, this.pageIndex);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
