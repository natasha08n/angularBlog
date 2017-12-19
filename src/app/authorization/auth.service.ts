import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject }                 from 'rxjs/Subject';
import { Router }                  from '@angular/router';
import 'rxjs/add/operator/map';

import { User }                    from './../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AuthService {

  private baseUrl = 'http://localhost:3000/users';
  private token: string;
  private userSource = new Subject<User>();
  private user$ = this.userSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  signIn(data: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/signin`, data, httpOptions)
      .map((answer) => this.setToken(answer));
  }

  signUp(data: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/signup`, data, httpOptions);
  }

  setUser(user: User): void {
    this.userSource.next(user);
  }

  setToken(answer): Object {
    const userInfo = answer.user;
    if (answer['success'] === true) {
      this.token = answer.token;
      localStorage.setItem('currentUser', JSON.stringify({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        surname: userInfo.surname,
        token: this.token
      }));
    }
    return answer;
  }

  verify(): Observable<Object> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      const token = currentUser.token || this.token;
      // if (token){
      //   console.log('if token', token);
      //   let httpOptions = {
      //     headers: new HttpHeaders({ 'x-access-token': token })
      //   };
      //   console.log('httpOptions', httpOptions);
      // }
      return this.http.get(`${this.baseUrl}/checkstate`, {
        headers: new HttpHeaders({ 'x-access-token': token })
      });
    } else {
      return this.http.get(`${this.baseUrl}/checkstate`, httpOptions);
    }
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('');
  }
}
