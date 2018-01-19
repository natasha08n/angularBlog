import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject }                 from 'rxjs/Subject';
import { Router }                  from '@angular/router';
import 'rxjs/add/operator/map';


import { User }                    from './../../shared/models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AuthService {

  private sessionUrl = 'http://localhost:3000/session';
  private usersUrl = 'http://localhost:3000/users';

  private token: string;
  private userSource = new Subject<User>();
  public user$ = this.userSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  signIn(data: Object): Observable<Object> {
    return this.http.post(`${this.sessionUrl}`, data, httpOptions)
      .map((answer) => this.setToken(answer));
  }

  signUp(data: Object): Observable<Object> {
    return this.http.post(`${this.usersUrl}`, data, httpOptions);
  }

  setUser(user: User): void {
    this.userSource.next(user);
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  setToken(answer): Object {
    const userInfo = answer.user;
    if (answer['status']) {
      this.token = answer.token;
      localStorage.setItem('currentUser', JSON.stringify({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        surname: userInfo.surname
      }));
      localStorage.setItem('currentToken', JSON.stringify({token: this.token}));
    }
    return answer;
  }

  verify(): Observable<Object> {
    const currentToken = JSON.parse(localStorage.getItem('currentToken'));
    if (currentToken) {
      return this.http.get(`${this.sessionUrl}/checkstate`, {
        headers: new HttpHeaders({ 'x-access-token': currentToken.token })
      });
    } else {
      return this.http.get(`${this.sessionUrl}/checkstate`, httpOptions);
    }
  }

  logout(): void {
    this.token = null;
    this.userSource.next();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentToken');
    if (this.router.url === '/profile' || this.router.url === '/post/:id/edit' || this.router.url === '/post/create') {
      this.router.navigateByUrl('');
    }
  }
}
