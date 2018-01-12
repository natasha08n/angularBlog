import { Injectable }             from '@angular/core';
import { Router, CanActivate }    from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot }    from '@angular/router';

@Injectable()
export class NotLoginGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        console.log('here');
        this.router.navigate(['**'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
