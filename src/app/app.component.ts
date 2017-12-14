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

  constructor(public dialog: MatDialog) {}

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
}