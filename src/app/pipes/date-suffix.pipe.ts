import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe }            from '@angular/common';

const suffixes = ['th', 'st', 'nd', 'rd'];

@Pipe({name: 'dateSuffix'})

export class DateSuffixPipe implements PipeTransform {
    private datePipe: DatePipe = new DatePipe('en-US');

    transform(dateStamp: number): string {
        const dtfilter = this.datePipe.transform(dateStamp, 'short');
        const dayN = parseInt(dtfilter, 10);
        const relevantDigits = (dayN < 30) ? dayN % 20 : dayN % 30;
        const suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
        const dayS = this.datePipe.transform(dateStamp, 'd');
        const monthYear = this.datePipe.transform(dateStamp, 'MMMM yyyy');
        return `${dayS}${suffix} ${monthYear}`;
    }
}
