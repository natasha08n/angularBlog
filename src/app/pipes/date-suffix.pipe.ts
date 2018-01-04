import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe }            from '@angular/common';

const suffixes = ["th", "st", "nd", "rd"];

@Pipe({name: 'dateSuffix'})

export class DateSuffixPipe implements PipeTransform {
    private datePipe: DatePipe = new DatePipe('en-US');

    transform(dateStamp: number): string {
        let dtfilter = this.datePipe.transform(dateStamp, 'short');
        let dayN = parseInt(dtfilter, 10);
        let relevantDigits = (dayN < 30) ? dayN % 20 : dayN % 30;
        let suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
        let dayS = this.datePipe.transform(dateStamp, 'd');
        let monthYear = this.datePipe.transform(dateStamp, 'MMMM yyyy');
        return `${dayS}${suffix} ${monthYear}`;
    }
}