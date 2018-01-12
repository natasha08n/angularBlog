import { Component, OnDestroy }   from '@angular/core';
import { Subscription }           from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent }              from '@angular/material';

import { Post }                   from './../../models/post';
import { PostService }            from './../../post/post.service';

  @Component({
    selector: 'app-tag-page',
    templateUrl: './tag-page.component.html'
  })

export class TagPageComponent implements OnDestroy {
  posts: Post[];
  subscription: Subscription;

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

    this.subscription = postService.posts$.subscribe(
      (posts) => this.posts = posts
    );

    router.events.forEach(() => {
      this.tagname = this.route.snapshot.paramMap.get('tag');
      this.getPostsByTagCount(this.tagname);
      this.getPostsByTag(this.tagname, this.pageSize, 0);
    });
  }

  getPostsByTag(tagname: string, pageSize: number, pageIndex: number): void {
    this.postService.getPostsByTag(tagname, pageSize, pageIndex);
  }

  getPostsByTagCount(tagname: string): void {
    this.postService.getPostsByTagCount(tagname)
        .subscribe(count => {
            this.length = count[0]['count'];
        });
  }

  public getPaginationInfo(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPostsByTagCount(this.tagname);
    this.getPostsByTag(this.tagname, this.pageSize, this.pageIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
