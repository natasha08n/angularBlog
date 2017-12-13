import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MatButtonModule }                 from '@angular/material';
import { MatInputModule }                  from '@angular/material';
import { MatDialogModule }                 from '@angular/material/dialog';

import { LoginComponent }  from './login/login.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    MatButtonModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  bootstrap: [
    LoginComponent
  ]
})
export class AuthModule { }
