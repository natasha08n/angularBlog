import { Component }        from '@angular/core';
import { Subscription }     from 'rxjs/Subscription';
import { ActivatedRoute }   from '@angular/router';

import { Comment }          from './../../models/comment';
import { PostService }      from '../../post/post.service';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

@Component({
    selector: 'app-comments-list',
    templateUrl: './comments-list.component.html'
})

export class CommentsListsComponent {
    public comments: Comment[];
    private subscription: Subscription;
    public hasAnyComments: Boolean = false;

    constructor(
        private postService: PostService,
        private route: ActivatedRoute
    ) {
        this.subscription = postService.comments$.subscribe(
            (comments) => {
                this.comments = comments;
            }
        );
        
        const postId = +this.route.snapshot.paramMap.get('id');
        this.getComments(postId);
    }

    getComments(postId: number): void {
        this.postService.getCommentsPost(postId)
            .subscribe((comments) => {
                if(comments.length) {
                    this.hasAnyComments = true;
                    comments.forEach((comment) => {
                        comment.prevAuthor = this.getPreviousAuthor(comment.previousId, comments);
                    });
                    this.comments = this.buildHierarchy(comments);
                }
            });
    }

    getPreviousAuthor(previousId, comments): string {
        for(let i = 0; i < comments.length; i++) {
            if (comments[i].id === previousId) {
                return comments[i].author;
            }
        }
        return '';
    }

    buildHierarchy(comments: Comment[]) {
        let roots = [];
        let children = {};

        // find the top level nodes and hash the children based on parent
        for (let i = 0; i < comments.length; i++) {
            let prevId = comments[i].previousId;
            let target = [];
            if(!prevId) {
                target = roots;
            } else {
                children[prevId] = [];
                target = children[prevId];
            }
            target.push(comments[i]);
        }

        // function to recursively build the tree
        let findChildren = function (parent) {
            if (children[parent.id]) {
                parent.children = children[parent.id];
                for (let i = 0; i < parent.children.length; i++) {
                    findChildren(parent.children[i]);
                }
            }
        };

        for (let i = 0; i < roots.length; i++) {
            findChildren(roots[i]);
        }

        return roots;
    }
}