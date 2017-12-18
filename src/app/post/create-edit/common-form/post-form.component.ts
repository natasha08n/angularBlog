import { Component, Input }  from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA }      from '@angular/cdk/keycodes';

import { Post }             from './../../../models/post';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css']
})

export class PostFormComponent {
    @Input() post: Post;

    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;

    separatorKeysCodes = [ENTER, COMMA];

    add(event: MatChipInputEvent): void {
        let input = event.input;
        let value = event.value;

        if ((value || '').trim()) {
            this.post.tags.push(value.trim());
        }

        if (input) {
            input.value = '';
        }
    }

    remove(tag: any): void {
        let index = this.post.tags.indexOf(tag);

        if (index >= 0) {
            this.post.tags.splice(index, 1);
        }
    }
}
