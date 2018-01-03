import { Component, Input }        from '@angular/core';
import { EventEmitter }            from '@angular/core';
import { Output }                  from '@angular/core';
import { MatChipInputEvent }       from '@angular/material';
import { ENTER, COMMA }            from '@angular/cdk/keycodes';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog }               from '@angular/material';
import { Location }                from '@angular/common';
import { Router }                  from '@angular/router';

import { AuthService }             from './../../../authorization/auth.service';
import { PostService }             from '../../post.service';
import { Post }                    from './../../../models/post';
import { DeleteComponent }         from './../../delete-dialog/delete.component';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css']
})

export class PostFormComponent {
    @Input() post: Post;
    @Input() isCreated: boolean;
    @Output() createPost = new EventEmitter();
    @Output() editPost = new EventEmitter();

    constructor(
        private authService: AuthService,
        private postService: PostService,
        public dialog: MatDialog,
        private location: Location,
        private router: Router
    ) { }

    private visible: boolean = true;
    private selectable: boolean = true;
    private removable: boolean = true;
    private addOnBlur: boolean = true;

    private excerptLength: number = 20;

    private separatorKeysCodes = [ENTER, COMMA];

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if((value || '').trim()) {
            if(this.post.tags.length === 0 || this.post.tags.indexOf(value.trim()) === -1) {
                console.log(value, this.post.tags, this.post.tags.indexOf(value.trim()));
                this.post.tags.push(value.trim());
            }
        }

        if(input) {
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
        const user = this.authService.getUser();
        if(user && user.id) {
            post.userId = user.id;
            post.excerpt = post.text.split(/\s+/).slice(0, this.excerptLength).join(' ');
            console.log('excerpt', post.excerpt);
            this.createPost.emit(post);
        } else {
            alert('Oh, something was wrong... Please, try again!');
        }
    }

    edit(post: any) {
        const user = this.authService.getUser();
        if(user && user.id) {
            post.userId = user.id;
            post.excerpt = post.text.split(/\s+/).slice(0, this.excerptLength).join(' ');
            this.editPost.emit(post);
        } else {
            alert('Oh, something was wrong... Please, try again!')
        }
    }

    back() {
        this.location.back();
    }

    private title = new FormControl('', [Validators.required]);
    private subtitle = new FormControl('', [Validators.required]);
    private text = new FormControl('', [Validators.required]);
    private tags = [];

    getErrorTitleMessage() {
        if(this.title.hasError('required')){
            return 'You must enter a title';
        }
    }

    getErrorSubtitleMessage() {
        if(this.subtitle.hasError('required')){
            return 'You must enter a subtitle';
        }
    }

    getErrorTextMessage() {
        if(this.title.hasError('required')){
            return 'You must enter a text';
        }
    }

    getErrorTagsMessage() {
        if(!this.tags.length){
            return 'You must enter one tag at least';
        }
    }

    openDialogDelete(postId): void {
        const dialogRefDelete = this.dialog.open(DeleteComponent, {
            width: '350px',
            data: { id: postId }
        });

        dialogRefDelete.afterClosed().subscribe(result => {
            console.log('i am here');
            if(result) {
                this.postService.deletePost(postId)
                    .subscribe(res => {
                        if(res['status'] === 'success') {
                            this.router.navigateByUrl('');
                        }
                    });
            }
        })
    }
}
