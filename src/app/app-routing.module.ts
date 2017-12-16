import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { RouterModule }        from '@angular/router';
import { Routes }              from '@angular/router';

import { PostsListComponent }  from './post/posts-list.component';
import { PostPreviewComponent } from './post/post-preview.component';

const appRoutes: Routes = [
  { path: 'users', component: PostPreviewComponent },
  { path: 'posts', component: PostsListComponent }
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
