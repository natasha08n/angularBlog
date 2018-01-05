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

    public length: number = 100;
    public pageSize: number = 5;
    public pageSizeOptions: number[] = [5, 10, 25, 100];
    //datasource: null;
    public pageIndex: number;

    pageEvent: PageEvent;



    constructor(private postService: PostService) {
        this.subscription = postService.posts$.subscribe(
            (posts) => this.posts = posts
        );
        this.getPosts();
        this.getPostsCount();
    }

    getPosts(): void {
      this.postService.getPosts()
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

    public getServerData(event?:PageEvent){
        console.log('event' , event);
        /*this.postService.getPosts().subscribe(
          response => {
              this.datasource = response.data;
              this.pageIndex = response.pageIndex;
              this.pageSize = response.pageSize;
              this.length = response.length;
          },
          error =>{
            // handle error
          }
        );
        return event;*/
      }


}
