import { Component, Input, Output } from '@angular/core';
import { EventEmitter }             from 'events';
import { ActivatedRoute }           from '@angular/router';

import { CommentService }           from './../comments.service';
import { Comment }                  from './../../../shared/models/comment';

@Component({
    selector: 'app-comment-create',
    templateUrl: './comment-create.component.html',
    styleUrls: ['./comment-create.component.css']
})

export class CommentCreateComponent {
    @Input() userId: number;
    @Input() postId: number;
    @Input() previousCommentId: number = 0;

    public comment: string = '';

    constructor(
        private commentService: CommentService,
        private route: ActivatedRoute
    ) { }

    createComment(text: string) {
        this.comment = '';
        const date = Date.now();
        const comment = {
            id: 0,
            userId: this.userId,
            postId: this.postId,
            text: text,
            dateCreate: date,
            dateUpdate: date,
            previousId: Number(this.previousCommentId),
            prevAuthor: '',
            children: []
        };
        this.commentService.createComment(comment)
            .subscribe( () => {
                const postId = +this.route.snapshot.paramMap.get('id');
                this.commentService.getCommentsPost(postId);
            });
    }
 }
 