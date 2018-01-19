import { Component, Input }  from '@angular/core';

import { AdComponent }       from './../ad.component';

@Component({
    selector: 'app-first-ad',
    templateUrl: './first-ad.component.html'
})

export class FirstAdComponent implements AdComponent {
    @Input() data: any;
}
