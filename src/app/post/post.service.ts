import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs/observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Post }                    from './../models/post';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class PostService {
    private baseUrl = 'http://localhost:3000/entities';

    constructor(
        private http: HttpClient
    ) {}

    getAllPosts(): Observable<Post[]> {
        const url = `${this.baseUrl}/posts`;
        return this.http.get<Post[]>(url);
    }
}
