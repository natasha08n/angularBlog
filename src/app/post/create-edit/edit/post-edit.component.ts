import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';
import { Observable }               from 'rxjs/observable';

import { Post }                     from './../../../models/post';
import { PostService }              from './../../post.service';
import { ComponentCanDeactivate }   from './../../../guards/save-data.guard';

@Component({
    selector: 'app-post-edit',
    templateUrl: './post-edit.component.html'
})

export class PostEditComponent implements OnInit {
    public post: Post;
    private isDataSaved: boolean = false;

    constructor(
        private postService: PostService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.getPost();
    }

    canDeactivate(): boolean | Observable<boolean> {
        if (this.isDataSaved === false) {
          return confirm("Are you sure to leave this page? Some data haven't been saved yet.");
        }
        else {
          return true;
        }
    }

    getPost() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.postService.getPost(id)
            .subscribe(post => this.post = post);
    }

    editPost(post: Post): void {
        this.isDataSaved = true;
        post.dateUpdate = Date.now();
        this.postService.editPost(post)
            .subscribe(res => {
                console.log('received message', res);
                this.router.navigate(['/']);
            });
    }
}
