import { Component, Inject }             from '@angular/core';
import { EventEmitter, Output }          from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Post }                          from './../../models/post';
import { PostService }                   from './../post.service';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})

export class DeleteComponent { }
