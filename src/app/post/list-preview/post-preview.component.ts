import { Component, Input } from '@angular/core';
import { Subscription }     from 'rxjs/Subscription';
import { OnDestroy }        from '@angular/core/src/metadata/lifecycle_hooks';

import { Post }             from './../../models/post';
import { User }             from './../../models/user';
import { AuthService }      from '../../authorization/auth.service';

@Component({
    selector: 'app-post-preview',
    templateUrl: './post-preview.component.html',
    styleUrls: ['./post-preview.component.css']
})

export class PostPreviewComponent implements OnDestroy {
    @Input() post: Post;
    
    public user: User;
    private subscription: Subscription;

    constructor(private authService: AuthService) {
        this.subscription = authService.user$.subscribe(
            (user) => this.user = user
        );

        this.user = this.authService.getUser();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
