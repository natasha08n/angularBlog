import { Component }                                from '@angular/core';
import { Inject }                                   from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent }                           from './authorization/login/login.component';
import { SignupComponent }                          from './authorization/signup/signup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'creative';
  
  signIn: Object = {
    email: "",
    password: ""
  };

  signUp: Object = {
    email: "",
    name: "",
    surname: "",
    password: "",
    passwordConfirm: ""
  };

  constructor(public dialog: MatDialog) {}

  openDialogSignIn(): void {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      data: { email: "", password: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.signIn = result;
      console.log("data", this.signIn);
    });
  }

  openDialogSignUp(): void{
    let dialogRef = this.dialog.open(SignupComponent, {
      width: '500px',
      data: { email: "", name: "", surname: "", password: "", passwordConfirm: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.signUp = result;
      console.log("dataSignUp", this.signUp);
    });
  }
}