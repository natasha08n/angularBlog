import { Component, Input }  from '@angular/core';
import { EventEmitter }      from '@angular/core';
import { Output }            from '@angular/core';
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
    @Input() isCreated: boolean;
    @Output() createPost = new EventEmitter();

    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;

    separatorKeysCodes = [ENTER, COMMA];

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.post.tags.push(value.trim());
        }

        if (input) {
            input.value = '';
        }
    }

    remove(tag: any): void {
        const index = this.post.tags.indexOf(tag);

        if (index >= 0) {
            this.post.tags.splice(index, 1);
        }
    }

    create(post: any) {
        console.log("get", post);
        this.createPost.emit(post);
    }
}
