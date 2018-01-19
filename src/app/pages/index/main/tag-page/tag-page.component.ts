import { Component, OnDestroy }   from '@angular/core';
import { Subscription }           from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent }              from '@angular/material';

import { Post }                 from './../../../../shared/models/post';
import { PostService }          from './../../../../modules/post/post.service';

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html'
})

export class TagPageComponent implements OnDestroy {
  public posts: Post[];
  private subscriptionPosts: Subscription;
  private subscriptionCount: Subscription;

  private tagname: string;

  public length: number;
  public pageSize: number;
  public pageSizeOptions: number[];
  public pageIndex: number;

  pageEvent: PageEvent;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.length = this.postService.length;
    this.pageSize = this.postService.pageSize;
    this.pageSizeOptions = this.postService.pageSizeOptions;
    this.pageIndex = this.postService.pageIndex;

    this.subscriptionPosts = postService.posts$.subscribe(
      (posts) => {
        this.posts = posts;
      });

    this.subscriptionCount = postService.postsCount$.subscribe(
      (count) => {
        this.length = count;
      });

    this.route.params
      .subscribe((params) => {
        this.tagname = this.route.snapshot.paramMap.get('tag');
        this.getPostsByTag(this.tagname, 5, 0);
      });
  }

  getPostsByTag(tagname: string, pageSize: number, pageIndex: number): void {
    this.postService.getPostsByTag(tagname, pageSize, pageIndex);
  }

  public getPaginationInfo(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPostsByTag(this.tagname, 5, this.pageIndex);
  }

  ngOnDestroy() {
    this.subscriptionPosts.unsubscribe();
    this.subscriptionCount.unsubscribe();
  }
}
