import { BrowserModule }   from '@angular/platform-browser';
import { NgModule }        from '@angular/core';


import { AppComponent }    from './app.component';
import { LoginComponent }  from './authorization/login/login/login.component';
import { SignupComponent } from './authorization/signup/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }