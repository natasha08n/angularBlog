import { Component }              from '@angular/core';
import { Subscription }           from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import { Post }                   from './../../models/post';
import { PostService }            from './../../post/post.service';

  @Component({
    selector: 'app-tag-page',
    templateUrl: './tag-page.component.html'
  })

export class TagPageComponent {
  posts: Post[];
  subscription: Subscription;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = postService.posts$.subscribe(
      (posts) => this.posts = posts
    );
    router.events.forEach(() => {
      const tagname = this.route.snapshot.paramMap.get('tag');
      this.getPostsByTag(tagname);
    });
  }

  getPostsByTag(tagname: string): void {
    this.postService.getPostsByTag(tagname)
      .subscribe(posts => this.posts = posts);
  }
}
