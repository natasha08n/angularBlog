import { Component, OnInit }                          from '@angular/core';
import { Inject }                                     from '@angular/core';
import { FormControl, Validators, FormGroup }         from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA }   from '@angular/material';

import { AuthService }                                from './../auth.service';
import { patternValidator }                           from './../../../modules/post/create-edit/post-form/pattern-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(80), Validators.minLength(6)]),
    });
  }

  onNoClickSignIn(): void {
    this.dialogRef.close();
  }

  signIn() {
    this.dialogRef.close();
    console.log(this.loginForm.value);
    this.authService.signIn(this.loginForm.value)
      .subscribe(answer => {
        if (answer['success']) {
          this.authService.setUser(answer['user']);
        } else {
          alert(answer['message']);
        }
      });
  }
}
