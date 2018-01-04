import { Injectable }            from '@angular/core';
import { CanDeactivate }         from '@angular/router';
import { Observable }            from 'rxjs/observable';

export interface ComponentCanDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class SaveDataGuard implements CanDeactivate<ComponentCanDeactivate> {

    canDeactivate(component: ComponentCanDeactivate) {
        return component.canDeactivate ? component.canDeactivate() : true;
    }

}
