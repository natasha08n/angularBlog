import { Injectable }            from '@angular/core';
import { CanDeactivate }         from '@angular/router';
import { Observable }            from 'rxjs/observable';

import { AuthService }           from './../authorization/auth.service';

export interface ComponentCanDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class SaveDataGuard implements CanDeactivate<ComponentCanDeactivate> {

    constructor(private authService: AuthService) { }

    canDeactivate(component: ComponentCanDeactivate) {
        if (this.authService.getUser()) {
            return component.canDeactivate ? component.canDeactivate() : true;
        }
    }

}
