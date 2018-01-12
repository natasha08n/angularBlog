import { Component }   from '@angular/core';

import { User }        from './../models/user';
import { AuthService } from './../authorization/auth.service';
import { PostService } from '../post/post.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
    public user: User;

    constructor(
        private authService: AuthService,
        private postService: PostService
    ) {
        this.user = this.authService.getUser();
    }
}
