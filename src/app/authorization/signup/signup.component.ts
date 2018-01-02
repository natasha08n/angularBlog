import { Component }                                from '@angular/core';
import { Inject }                                   from '@angular/core';
import { FormControl, Validators }                  from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AuthService }                              from './../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  private email = new FormControl('', [Validators.required, Validators.email]);
  private name = new FormControl('', [Validators.required, Validators.maxLength(80), Validators.minLength(3)]);
  private surname = new FormControl('', [Validators.required, Validators.maxLength(80), Validators.minLength(3)]);
  private password = new FormControl('', [Validators.required, Validators.maxLength(80), Validators.minLength(6)]);
  private passwordConfirm = new FormControl('', [Validators.required, Validators.maxLength(80), Validators.minLength(6)]);

  constructor(public dialogRef: MatDialogRef<SignupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService) { 
  }

  onNoClickSignUp(): void {
    this.dialogRef.close();
  }

  getErrorEmailMessage() {
    const hasError = this.email.hasError('required');
    const hasEmail = this.email.hasError('email');
    if(hasError) {
      return 'You must enter a value';
    }
    if(hasEmail) {
      return 'Not a valid email';
    }
  }

  getErrorNameMessage() {
    return this.surname.hasError('required') ? 'Name is required' : this.name.hasError('maxlength') ? 'Max length is 80 characters' : this.name.hasError('minlength') ? 'Min length is 3 characters' : '';
  }

  getErrorSurnameMessage() {
    return this.surname.hasError('required') ? 'Surname is required' : this.surname.hasError('maxlength') ? 'Max length is 80 characters' : this.surname.hasError('minlength') ? 'Min length is 3 characters' : '';
  }

  getErrorPasswordMessage() {
    return this.password.hasError('required') ? 'Password is required' : this.password.hasError('maxlength') ? 'Max length is 80 characters' : this.password.hasError('minlength') ? 'Min length is 6 characters' : '';
  }

  getErrorPasswordConfirmMessage() {
    return this.passwordConfirm.hasError('required') ? 'Confirm password, please' : this.passwordConfirm.hasError('maxlength') ? 'Max length is 80 characters' : this.passwordConfirm.hasError('minlength') ? 'Min length is 6 characters' : '';
  }

  signUp(data: Object) {
    this.dialogRef.close();
    this.authService.signUp(data)
      .subscribe(answer => {
        if (answer['success'] === true) {
          this.authService.setUser(answer['user']);
        } else {
          console.log(answer['message']);
        }
      });
  }
}
