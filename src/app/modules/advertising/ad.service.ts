import { Injectable }       from '@angular/core';

import { AdItem }           from './ad-item';
import { FirstAdComponent } from './first-ad/first-ad.component';

@Injectable()
export class AdService {
    getAds() {
        return [
            new AdItem(FirstAdComponent,
                {body: 'https://i.pinimg.com/736x/79/92/20/79922049498957043720ab789b46e220--web-banner-design-banner-web.jpg'}),

            new AdItem(FirstAdComponent,
                {body: 'https://s3.envato.com/files/181151801/jpg/300x600_Half_Page_Banner.jpg'}),

            new AdItem(FirstAdComponent,
                {body: 'https://i.pinimg.com/736x/01/ea/ae/01eaae54ac5af636c2d2a928c5c4a527--banner-productivity.jpg'}),

            new AdItem(FirstAdComponent,
                {body: 'https://i.pinimg.com/originals/15/e2/07/15e2070f6d5d01eb263f48ce657fe6a8.jpg'}),

            new AdItem(FirstAdComponent,
                {body: 'https://learn.canva.com/wp-content/uploads/2016/11/1475a2f5413c372c15cdce471459d911.jpg'}),

            new AdItem(FirstAdComponent,
                {body: 'https://i.pinimg.com/474x/54/00/e9/5400e9208470686c4c22643c40119575--display-banners-karlie-kloss.jpg'}),

            new AdItem(FirstAdComponent,
                {body: 'https://s3.envato.com/files/65363853/Blue/AppBusiness%20ad%20Single%20Store%20Buttons%20300x600.png'}),

            new AdItem(FirstAdComponent,
                {body: 'https://s3.envato.com/files/173523708/300x600.jpg'}),

            new AdItem(FirstAdComponent,
                {body: 'https://s3.envato.com/files/55686716/Preview/Green%20Banner%20ad%20Design%20300x600.png'})
        ];
    }
}
