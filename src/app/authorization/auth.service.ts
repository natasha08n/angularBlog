import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject }                 from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { User }                    from './../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable()
export class AuthService {

  private baseUrl = "http://localhost:3000/users";
  token: string;
  private userSource = new Subject<User>();
  user$ = this.userSource.asObservable();

  constructor(
    private http: HttpClient
  ) { 
    console.log("constructorAuthService");
  }

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
    let userInfo = answer.user;
    if (answer["success"] === true) {
      this.token = answer.token;
      localStorage.setItem("currentUser", JSON.stringify({
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
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let token = (currentUser && currentUser["token"]) ? currentUser.token : this.token;
    // if (token){
    //   console.log("if token", token);
    //   let httpOptions = {
    //     headers: new HttpHeaders({ "x-access-token": token })
    //   };
    //   console.log("httpOptions", httpOptions);
    // }
    return this.http.get(`${this.baseUrl}/checkstate`, {
      headers: new HttpHeaders({ "x-access-token": token })
    });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem("currentUser");
  }
}