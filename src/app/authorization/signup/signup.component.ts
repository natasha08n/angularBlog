import { Component, OnInit }                        from '@angular/core';
import { Inject }                                   from '@angular/core';
import { FormControl, Validators, FormGroup }       from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AuthService }                              from './../auth.service';
import { patternValidator }                         from './../../post/create-edit/common-form/pattern-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.maxLength(80), Validators.minLength(3)]),
      surname: new FormControl('', [Validators.required, Validators.maxLength(80), Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(80), Validators.minLength(6)])
    });
  }

  onNoClickSignUp(): void {
    this.dialogRef.close();
  }

  signUp() {
    this.dialogRef.close();
    this.authService.signUp(this.signupForm.value)
      .subscribe(answer => {
        if (answer['success'] === true) {
          this.authService.setUser(answer['user']);
        } else {
          console.log(answer['message']);
        }
      });
  }
}
