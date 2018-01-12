import { Component }   from '@angular/core';

import { User }        from './../../shared/models/user';
import { AuthService } from './../../modules/authorization/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
    public user: User;

    constructor(private authService: AuthService) {
        this.user = this.authService.getUser();
    }
}
