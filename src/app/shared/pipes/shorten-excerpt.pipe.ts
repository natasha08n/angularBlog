import { Pipe, PipeTransform } from '@angular/core';

const shortenLength = 10;

@Pipe({name: 'shortenExcerpt' })

export class ShortenExcerptPipe implements PipeTransform {
    transform(text: string): string {
        return text.split(/\s+/).slice(0, shortenLength).join(' ');
    }
}
