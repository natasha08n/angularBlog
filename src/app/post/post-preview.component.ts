import { Component, Input } from '@angular/core';

import { Post }             from './../models/post';

@Component({
    selector: 'app-post-preview',
    templateUrl: './post-preview.component.html'
})

export class PostPreviewComponent {
    @Input() post: Post;
}
