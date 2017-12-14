import { Component, OnInit, OnDestroy }             from '@angular/core';
import { Inject }                                   from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription }                             from 'rxjs/Subscription';

import { AuthService }                              from './authorization/auth.service';
import { User }                                     from './models/user';
import { LoginComponent }                           from './authorization/login/login.component';
import { SignupComponent }                          from './authorization/signup/signup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  user: User;
  subscription: Subscription;
  message: String;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    this.subscription = authService.user$.subscribe(
      (user) => this.user = user
    )
  }

  openDialogSignIn(): void {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      data: { email: "", password: "" }
    });
  }

  openDialogSignUp(): void{
    let dialogRef = this.dialog.open(SignupComponent, {
      width: '500px',
      data: { email: "", name: "", surname: "", password: "", passwordConfirm: "" }
    });
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.message = "Current user has been successfully logout";
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.authService.verify().subscribe(
      (answer) => this.message = answer["message"]
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}