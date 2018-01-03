import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs/observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject }                 from 'rxjs/subject';

import { Comment }                 from './../models/comment';

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