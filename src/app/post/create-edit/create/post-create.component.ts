import { Component, Input } from '@angular/core';

import { Post }             from './../../../models/post';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
})

export class PostCreateComponent {
    post: Post;

    constructor () {
        this.post = new Post();
        console.log('create', this.post);
    }
}
