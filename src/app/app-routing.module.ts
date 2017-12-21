import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { RouterModule }        from '@angular/router';
import { Routes }              from '@angular/router';

import { PostsListComponent }  from './post/list-preview/posts-list.component';
import { PostCreateComponent } from './post/create-edit/create/post-create.component';
import { PostEditComponent }   from './post/create-edit/edit/post-edit.component';
import { NotFoundComponent }   from './not-found/not-found.component';
import { NotLoginGuard }       from './guards/not-login.guard';
import { PostViewComponent }   from './post/post-view/post-view.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full' , component: PostsListComponent },
  { path: 'post/create', component: PostCreateComponent, canActivate: [NotLoginGuard] },
  { path: 'post/:id/edit', component: PostEditComponent, canActivate: [NotLoginGuard] },
  { path: 'post/:id', component: PostViewComponent },

  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
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
