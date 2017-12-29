import { Component, Input } from '@angular/core';

import { PostService }      from './../../post/post.service';
import { Comment }          from './../../models/comment';

@Component({
    selector: 'app-comment-create',
    templateUrl: './comment-create.component.html',
    styleUrls: ['./comment-create.component.css']
})

export class CommentCreateComponent {
    @Input() userId: number;
    @Input() postId: number;

    constructor(
        private postService: PostService
    ) { }

    createComment(text: string, previous: number) {
        const date = Date.now();
        if(!previous) {
            previous = 0;
        }
        const comment = {
            userId: this.userId,
            postId: this.postId,
            text: text,
            dateCreate: date,
            dateUpdate: date,
            previousId: previous
        }
        this.postService.createComment(comment)
            .subscribe(() => {
                console.log('comment has been added');
            })
    }
 }