import { Component, Input } from '@angular/core';

import { Post }             from './../../../models/post';

@Component({
    selector: 'app-post-edit',
    templateUrl: './post-edit.component.html'
})

export class PostEditComponent {
    post: Post;

    constructor () {
        this.post = new Post(5, 'Title', 'Subtitle', 'textext textext textext textext textext textext textext textext textext textext textext', ['first', 'second', 'third']);
        console.log('edit', this.post);
    }
}