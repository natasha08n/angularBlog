import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { RouterModule }    from '@angular/router';
import { Routes }          from '@angular/router';

import { LoginComponent }  from './authorization/login/login.component';
import { SignupComponent } from './authorization/signup/signup.component';

const appRoutes: Routes = [
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
