import { Component, Input, OnInit } from '@angular/core';
import { DatePipe }                 from '@angular/common';
import { Router }                   from '@angular/router';
import { Observable }               from 'rxjs/observable';

import { Post }                     from './../../../models/post';
import { PostService }              from './../../post.service';
import { ComponentCanDeactivate }   from './../../../guards/save-data.guard';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
})

export class PostCreateComponent implements OnInit {
    private post: Post;
    private isCreated: boolean = true;
    private isDataSaved: boolean = false;

    constructor (
        private postService: PostService,
        private router: Router,
        private datePipe: DatePipe) {
    }

    ngOnInit() {
        this.post = new Post();
    }

    canDeactivate(): boolean | Observable<boolean> {
        if (this.isDataSaved === false) {
          return confirm(`Are you sure to leave this page? Some data haven't been saved yet.`);
        } else {
          return true;
        }
    }

    createPost(post: Post) {
        this.isDataSaved = true;
        post.dateCreate = Date.now();
        post.dateUpdate = post.dateCreate;
        this.postService.createPost(post)
            .subscribe((id) => {
                this.router.navigate(['/post', id]);
            });
    }
}
