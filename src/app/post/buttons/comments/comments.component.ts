import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html'
})

export class CommentsComponent {
    @Input() comments: number;
}
