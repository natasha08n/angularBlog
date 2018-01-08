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

    private postsCount = new Subject<Object>();
    public postsCount$ = this.postsCount.asObservable();

    constructor(private http: HttpClient) { }

    getPostsCount(): Observable<Object>  {
        const url = `${this.baseUrl}/posts/count`;
        this.http.get<Object>(url, httpOptions)
            .subscribe(count => {
                this.postsCount.next(count);
            });
        return this.postsCount;
    }

    getPosts(count: number, page: number): Observable<Post[]> {
        const url = `${this.baseUrl}/posts`;
        this.http.post<Post[]>(url, {count: count, page: page}, httpOptions)
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

    getPostsByTagCount(tagname: string): Observable<Object>  {
        const url = `${this.baseUrl}/posts/${tagname}/count`;
        this.http.get<Object>(url, httpOptions)
            .subscribe(count => {
                this.postsCount.next(count);
            });
        return this.postsCount;
    }

    getPostsByTag(tagname: string, pageSize: number, pageIndex: number): Observable<Post[]> {
        const url = `${this.baseUrl}/tag/${tagname}`;
        this.http.post<Post[]>(url, {count: pageSize, page: pageIndex}, httpOptions)
            .subscribe(posts => {
                this.posts.next(posts);
            });
        return this.posts;
    }
}
