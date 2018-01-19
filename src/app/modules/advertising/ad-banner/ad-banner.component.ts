import { Component, Input, AfterContentInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { AdDirective }  from './../ad.directive';
import { AdItem }       from './../ad-item';
import { AdComponent }  from './../ad.component';

@Component({
    selector: 'app-ad-banner',
    templateUrl: './ad-banner.component.html',
    styleUrls: ['./ad-banner.component.css']
})

export class AdBannerComponent implements AfterContentInit, OnDestroy {
    @Input() ads: AdItem[];
    currentAddIndex: number = -1;
    @ViewChild(AdDirective) adHost: AdDirective;
    interval: any;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngAfterContentInit() {
        this.loadComponent();
        this.getAds();
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    loadComponent() {
        this.currentAddIndex = (this.currentAddIndex + 1) % this.ads.length;
        const adItem = this.ads[this.currentAddIndex];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<AdComponent>componentRef.instance).data = adItem.data;
    }

    getAds() {
        this.interval = setInterval(() => {
            this.loadComponent();
        }, 5000);
    }
}
