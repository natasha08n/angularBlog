import { Component, Input, OnInit } from '@angular/core';
import { EventEmitter, Output }     from '@angular/core';
import { MatChipInputEvent }        from '@angular/material';
import { ENTER, COMMA }             from '@angular/cdk/keycodes';
import { FormControl, Validators }  from '@angular/forms';
import { FormGroup }                from '@angular/forms';
import { MatDialog }                from '@angular/material';
import { Location }                 from '@angular/common';
import { Router }                   from '@angular/router';

import { AuthService }              from './../../../authorization/auth.service';
import { PostService }              from '../../post.service';
import { Post }                     from './../../../models/post';
import { DeleteComponent }          from './../../delete-dialog/delete.component';
import { patternValidator }         from './pattern-validator';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css']
})

export class PostFormComponent implements OnInit {
    @Input() post: Post;
    @Input() isCreated: boolean;
    @Output() createPost = new EventEmitter();
    @Output() editPost = new EventEmitter();

    form: FormGroup;

    /*variables for tags (mat-chips)*/
    private visible: Boolean = true;
    private selectable: Boolean = true;
    private removable: Boolean = true;
    private addOnBlur: Boolean = true;

    private separatorKeysCodes = [ENTER, COMMA];

    private excerptLength: number = 80;

    constructor(
        private authService: AuthService,
        private postService: PostService,
        public dialog: MatDialog,
        private location: Location,
        private router: Router
    ) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = new FormGroup({
            title: new FormControl('', [Validators.required]),
            subtitle: new FormControl('', [Validators.required]),
            text: new FormControl('', [Validators.required]),
            tags: new FormControl([], Validators.required)
        });
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            if (this.post.tags.length === 0 || this.post.tags.indexOf(value.trim()) === -1) {
                this.post.tags.push(value.trim());
            }
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

    create() {
        this.getPostFromForm();
        if (this.getPostAuthor()) {
            this.createPost.emit(this.post);
        } else {
            alert('Oh, something was wrong... Please, try again!');
        }
    }

    edit() {
        const user = this.authService.getUser();
        if (this.getPostAuthor()) {
            this.editPost.emit(this.post);
        } else {
            alert('Oh, something was wrong... Please, try again!');
        }
    }

    getPostFromForm(): void {
        this.post.title = this.form.value.title;
        this.post.subtitle = this.form.value.subtitle;
        this.post.text = this.form.value.text;
        this.post.excerpt = this.post.text.split(/\s+/).slice(0, this.excerptLength).join(' ');
    }

    getPostAuthor(): boolean {
        const user = this.authService.getUser();
        if (user && user.id) {
            this.post.userId = user.id;
            return true;
        }
        return false;
    }

    back() {
        this.location.back();
    }

    openDialogDelete(postId): void {
        const dialogRefDelete = this.dialog.open(DeleteComponent, {
            width: '350px',
            data: { id: postId }
        });

        dialogRefDelete.afterClosed().subscribe(result => {
            console.log('i am here');
            if (result) {
                this.postService.deletePost(postId)
                    .subscribe(res => {
                        if (res['status'] === 'success') {
                            this.router.navigateByUrl('');
                        }
                    });
            }
        });
    }
}
