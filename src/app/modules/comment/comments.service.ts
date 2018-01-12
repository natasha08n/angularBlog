import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs/observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject }                 from 'rxjs/subject';

import { Comment }                 from './../../shared/models/comment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class CommentService {
    private baseUrl = 'http://localhost:3000/entities';

    private comments = new Subject<Comment[]>();
    public comments$ = this.comments.asObservable();

    constructor(private http: HttpClient) { }

    createComment(comment: Comment): Observable<Comment> {
        const url = `${this.baseUrl}/comment`;
        return this.http.post<Comment>(url, comment, httpOptions);
    }

    getCommentsPost(postId: number): Observable<Comment[]> {
        const url = `${this.baseUrl}/${postId}/comments`;
        this.http.get<Comment[]>(url, httpOptions)
            .subscribe(comments => {
                comments.forEach((comment) => {
                    comment.prevAuthor = this.getPreviousAuthor(comment.previousId, comments);
                });
                console.log('comments', comments);
                comments = this.buildHierarchy(comments);
                this.comments.next(comments);
            });
        return this.comments;
    }

    deleteComment(commentId: number) {
        const url = `${this.baseUrl}/comment/${commentId}`;
        return this.http.delete<Comment>(url, httpOptions);
    }

    getPreviousAuthor(previousId, comments): string {
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].id === previousId) {
                return comments[i].author;
            }
        }
        return '';
    }

    buildHierarchy(arry: Comment[]) {
        let roots = [];
        const children = {};

        // find the top level nodes and hash the children based on parent
        for (let i = 0, len = arry.length; i < len; ++i) {
            const item = arry[i];
            const p = item.previousId;
            const target = !p ? roots : (children[p] || (children[p] = []));

            target.push(item);
        }

        // function to recursively build the tree
        const findChildren = function (parent) {
            if (children[parent.id]) {
                parent.children = children[parent.id];
                for (let i = 0, len = parent.children.length; i < len; ++i) {
                    findChildren(parent.children[i]);
                }
            }
        };

        // enumerate through to handle the case where there are multiple roots
        for (let i = 0, len = roots.length; i < len; ++i) {
            findChildren(roots[i]);
        }

        roots = roots.sort((a, b) => {
            if (a.dateUpdate > b.dateUpdate) {
                return 1;
            } else if (a.dateUpdate < a.dateUpdate) {
                return -1;
            } else {
                return 0;
            }
        });

        return roots;
    }
}
