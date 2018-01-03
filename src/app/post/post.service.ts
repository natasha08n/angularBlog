import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs/observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject }                 from 'rxjs/Subject';

import { Post }                    from './../models/post';
import { Tag }                     from './../models/tag';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class PostService {
    private baseUrl = 'http://localhost:3000/entities';

    private posts = new Subject<Post[]>();
    public posts$ = this.posts.asObservable();

    constructor(private http: HttpClient) { }

    getAllPosts(): Observable<Post[]> {
        const url = `${this.baseUrl}/posts`;
        this.http.get<Post[]>(url, httpOptions)
            .subscribe(posts => {
                this.posts.next(posts);
            });
        return this.posts;
    }

    createPost(post: Post): Observable<Post> {
        const url = `${this.baseUrl}/post`;
        return this.http.post<Post>(url, post, httpOptions);
    }

    getPost(id: number): Observable<Post> {
        const url = `${this.baseUrl}/post/${id}`;
        return this.http.get<Post>(url, httpOptions);
    }

    editPost(post: Post) {
        const url = `${this.baseUrl}/post/${post.id}`;
        return this.http.put(url, post, httpOptions);
    }

    deletePost(id: number) {
        const url = `${this.baseUrl}/post/${id}`;
        return this.http.delete(url, httpOptions);
    }

    getPopularTags(): Observable<Tag[]> {
        const url = `${this.baseUrl}/tags`;
        return this.http.get<Tag[]>(url, httpOptions);
    }

    getPostsByTag(tagname: string): Observable<Post[]> {
        const url = `${this.baseUrl}/tag/${tagname}`;
        this.http.get<Post[]>(url, httpOptions)
            .subscribe(posts => {
                this.posts.next(posts);
            });
        return this.posts;
    }
}
