import { Component, OnInit }                        from '@angular/core';
import { Inject }                                   from '@angular/core';
import { FormControl, Validators }                  from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required, Validators.maxLength(80), Validators.minLength(3)]);
  surname = new FormControl('', [Validators.required, Validators.maxLength(80), Validators.minLength(3)]);
  password = new FormControl('', [Validators.required, Validators.maxLength(80), Validators.minLength(6)]);
  passwordConfirm = new FormControl('', [Validators.required, Validators.maxLength(80), Validators.minLength(6)]);

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClickSignIn(): void {
    this.dialogRef.close();
  }

  getErrorEmailMessage() {
    return this.email.hasError("required") ? "You must enter a value" : this.email.hasError("email") ? "Not a valid email" : "";
  }

  getErrorNameMessage() {
    return this.surname.hasError("required") ? "Name is required" : this.name.hasError("maxlength") ? "Max length is 80 characters" : this.name.hasError("minlength") ? "Min length is 3 characters" : "";
  }

  getErrorSurnameMessage() {
    return this.surname.hasError("required") ? "Surname is required" : this.surname.hasError("maxlength") ? "Max length is 80 characters" : this.surname.hasError("minlength") ? "Min length is 3 characters" : "";
  }

  getErrorPasswordMessage() {
    return this.password.hasError("required") ? "Password is required" : this.password.hasError("maxlength") ? "Max length is 80 characters" : this.password.hasError("minlength") ? "Min length is 6 characters" : "";
  }

  getErrorPasswordConfirmMessage() {
    return this.passwordConfirm.hasError("required") ? "Confirm password, please" : this.passwordConfirm.hasError("maxlength") ? "Max length is 80 characters" : this.passwordConfirm.hasError("minlength") ? "Min length is 6 characters" : "";
  }
}