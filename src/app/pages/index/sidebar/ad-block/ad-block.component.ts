import { Component, OnInit } from '@angular/core';

import { AdService }         from './../../../../modules/advertising/ad.service';
import { AdItem }            from './../../../../modules/advertising/ad-item';

@Component({
    selector: 'app-ad-block',
    templateUrl: './ad-block.component.html'
})

export class AdBlockComponent implements OnInit {
    ads: AdItem[];

    constructor(private adService: AdService) { }

    ngOnInit() {
        this.ads = this.adService.getAds();
    }
}

