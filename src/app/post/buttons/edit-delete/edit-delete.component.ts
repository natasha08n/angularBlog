import { Component, Input } from '@angular/core';

import { Post }             from './../../../models/post';

@Component({
    selector: 'app-edit-delete',
    templateUrl: './edit-delete.component.html',
    styleUrls: ['./edit-delete.component.css']
})

export class EditDeleteComponent {
    @Input() postId: Number;
}