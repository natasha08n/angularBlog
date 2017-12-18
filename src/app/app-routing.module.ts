import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { RouterModule }        from '@angular/router';
import { Routes }              from '@angular/router';

import { PostsListComponent }  from './post/list-preview/posts-list.component';
import { PostCreateComponent } from './post/create-edit/create/post-create.component';
import { PostEditComponent }   from './post/create-edit/edit/post-edit.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full' , component: PostsListComponent },
  { path: 'post/create', component: PostCreateComponent },
  { path: 'post/edit', component: PostEditComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
