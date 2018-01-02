import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-comment-view',
    templateUrl: './comment-view.component.html',
    styleUrls: ['/comment-view.component.css']
})

export class CommentViewComponent {
    @Input() comment: Comment;
}