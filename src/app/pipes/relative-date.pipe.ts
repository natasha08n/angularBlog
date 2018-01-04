import { Pipe, PipeTransform } from '@angular/core';

const epochs: any = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
];

@Pipe({name: 'relativeDate'})

export class RelativeDatePipe implements PipeTransform {
    
    getDuration(timeAgoInSeconds: number) {
        for (let [name, seconds] of epochs) {
            let interval = Math.floor(timeAgoInSeconds / seconds);

            if (interval >= 1) {
                return {
                    interval: interval,
                    epoch: name
                };
            }
        }
        return {
            interval: 0,
            epoch: 'seconds'
        };
    };

    transform(dateStamp: number): string {

        let timeAgoInSeconds = Math.floor((new Date().getTime() - new Date(dateStamp).getTime()) / 1000);
        let {interval, epoch} = this.getDuration(timeAgoInSeconds);
        let suffix = interval === 1 ? '' : 's';

        return `${interval} ${epoch}${suffix} ago`;

    }

}