import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { RouterModule }        from '@angular/router';
import { Routes }              from '@angular/router';

import { PostsListComponent }  from './modules/post/list-preview/posts-lists/posts-list.component';
import { PostCreateComponent } from './modules/post/create-edit/post-сreate/post-create.component';
import { PostEditComponent }   from './modules/post/create-edit/post-edit/post-edit.component';
import { PostViewComponent }   from './modules/post/post-view/post-view.component';
import { NotFoundComponent }   from './pages/not-found/not-found.component';
import { LayoutComponent }     from './pages/index/main/layout/layout.component';
import { MainPageComponent }   from './pages/index/main/main-page/main-page.component';
import { TagPageComponent }    from './pages/index/main/tag-page/tag-page.component';
import { ProfileComponent }    from './pages/profile/profile.component';
import { NotLoginGuard }       from './shared/guards/not-login.guard';
import { SaveDataGuard }       from './shared/guards/save-data.guard';

const appRoutes: Routes = [
  { path: '', component: LayoutComponent, children: [
        { path: '', component: MainPageComponent },
        { path: 'tag/:tag', component: TagPageComponent }
    ]
  },
  { path: 'post/create', component: PostCreateComponent, canActivate: [NotLoginGuard], canDeactivate: [SaveDataGuard] },
  { path: 'post/:id/edit', component: PostEditComponent, canActivate: [NotLoginGuard], canDeactivate: [SaveDataGuard] },
  { path: 'post/:id', component: PostViewComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [NotLoginGuard] },

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
