import { Component, Input } from '@angular/core';

import { Post }             from './../../models/post';
import { User }             from './../../models/user';
import { AuthService }      from '../../authorization/auth.service';

@Component({
    selector: 'app-post-preview',
    templateUrl: './post-preview.component.html',
    styleUrls: ['./post-preview.component.css']
})

export class PostPreviewComponent {
    @Input() post: Post;

    
    
    public user: User;

    constructor(private authService: AuthService) {
        this.user = this.authService.getUser();
    }

}
