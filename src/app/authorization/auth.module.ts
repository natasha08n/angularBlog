import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule }     from '@angular/material';
import { MatInputModule }      from '@angular/material';
import { MatDialogModule }     from '@angular/material/dialog';
import { MatIconModule }       from '@angular/material';
import { HttpModule }          from '@angular/http';
import { HttpClientModule }    from '@angular/common/http';

import { LoginComponent }      from './login/login.component';
import { SignupComponent }     from './signup/signup.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    HttpModule,
    HttpClientModule
  ],
  exports: [
    MatButtonModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  bootstrap: [
    LoginComponent,
    SignupComponent
  ]
})
export class AuthModule { }
