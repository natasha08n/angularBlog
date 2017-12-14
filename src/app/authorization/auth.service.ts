import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable()
export class AuthService {

  private baseUrl = "http://localhost:3000/users";

  constructor(
    private http: HttpClient
  ) { }

  signIn(data: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/signin`, data, httpOptions);
  }

  signUp(data: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/signup`, data, httpOptions);
  }
}
