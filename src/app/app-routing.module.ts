import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { RouterModule }        from '@angular/router';
import { Routes }              from '@angular/router';

import { LoginComponent }      from './authorization/login/login.component';
import { SignupComponent }     from './authorization/signup/signup.component';
import { PostCreateComponent } from './post/post-create.component';

const appRoutes: Routes = [
  //{ path: 'post/:id', component: 'PostDetailComponent' },
  { path: 'post/create', component: 'PostCreateComponent' }
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
