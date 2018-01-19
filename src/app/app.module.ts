import { BrowserModule }                 from '@angular/platform-browser';
import { NgModule }                      from '@angular/core';
import { RouterModule }                  from '@angular/router';
import { Routes }                        from '@angular/router';
import 'hammerjs';
import { FormsModule }                   from '@angular/forms';
import { ReactiveFormsModule }           from '@angular/forms';
import { BrowserAnimationsModule }       from '@angular/platform-browser/animations';
import { GoTopButtonModule }             from 'ng2-go-top-button';
import { MatSelectModule }               from '@angular/material/select';
import { MatDialogModule }               from '@angular/material/dialog';
import { platformBrowserDynamic }        from '@angular/platform-browser-dynamic';
import { MatInputModule }                from '@angular/material';
import { MatPaginatorModule }            from '@angular/material';
import { MatIconModule, MatChipsModule } from '@angular/material';
import { DatePipe }                      from '@angular/common';

import { AppRoutingModule }              from './app-routing.module';

import { AuthService }                   from './modules/authorization/auth.service';
import { PostService }                   from './modules/post/post.service';
import { CommentService }                from './modules/comment/comments.service';
import { AdService }                     from './modules/advertising/ad.service';

import { AuthModule }                    from './modules/authorization/auth.module';

import { AdDirective }                   from './modules/advertising/ad.directive';

import { AppComponent }                  from './app.component';
import { LoginComponent }                from './modules/authorization/login/login.component';
import { PostsListComponent }            from './modules/post/list-preview/posts-lists/posts-list.component';
import { PostPreviewComponent }          from './modules/post/list-preview/post-preview/post-preview.component';
import { SocialComponent }               from './modules/post/buttons/social/social.component';
import { CommentsComponent }             from './modules/post/buttons/comments/comments.component';
import { EditDeleteComponent }           from './modules/post/buttons/edit-delete/edit-delete.component';
import { PostCreateComponent }           from './modules/post/create-edit/post-сreate/post-create.component';
import { PostEditComponent }             from './modules/post/create-edit/post-edit/post-edit.component';
import { PostFormComponent }             from './modules/post/create-edit/post-form/post-form.component';
import { PostViewComponent}              from './modules/post/post-view/post-view.component';
import { DeleteComponent }               from './modules/post/delete/delete.component';
import { CommentCreateComponent }        from './modules/comment/comment-create/comment-create.component';
import { CommentViewComponent }          from './modules/comment/comment-view/comment-view.component';
import { CommentsListsComponent }        from './modules/comment/comments-list/comments-list.component';
import { DeleteDialogCommentComponent }  from './modules/comment/delete-dialog-comment/delete-dialog-comment.component';
import { FirstAdComponent }              from './modules/advertising/first-ad/first-ad.component';
import { AdBannerComponent }             from './modules/advertising/ad-banner/ad-banner.component';
import { SidebarComponent }              from './pages/index/sidebar/sidebar.component';
import { PopularTagsComponent }          from './pages/index/sidebar/popular-tags/popular-tags.component';
import { RecentPostsComponent }          from './pages/index/sidebar/recent-posts/recent-posts.component';
import { AdBlockComponent }              from './pages/index/sidebar/ad-block/ad-block.component';
import { LayoutComponent }               from './pages/index/main/layout/layout.component';
import { TagPageComponent }              from './pages/index/main/tag-page/tag-page.component';
import { MainPageComponent }             from './pages/index/main/main-page/main-page.component';
import { ProfileComponent }              from './pages/profile/profile.component';
import { NotFoundComponent }             from './pages/not-found/not-found.component';

import { NotLoginGuard }                 from './shared/guards/not-login.guard';
import { SaveDataGuard }                 from './shared/guards/save-data.guard';

import { RelativeDatePipe }              from './shared/pipes/relative-date.pipe';
import { DateSuffixPipe }                from './shared/pipes/date-suffix.pipe';
import { ShortenExcerptPipe }            from './shared/pipes/shorten-excerpt.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PostsListComponent,
    PostPreviewComponent,
    PostViewComponent,
    SocialComponent,
    CommentsComponent,
    EditDeleteComponent,
    PostCreateComponent,
    PostEditComponent,
    DeleteComponent,
    PostFormComponent,
    LayoutComponent,
    PopularTagsComponent,
    RecentPostsComponent,
    AdBlockComponent,
    TagPageComponent,
    MainPageComponent,
    CommentCreateComponent,
    CommentViewComponent,
    CommentsListsComponent,
    DeleteDialogCommentComponent,
    RelativeDatePipe,
    DateSuffixPipe,
    ShortenExcerptPipe,
    ProfileComponent,
    FirstAdComponent,
    AdBannerComponent,
    AdDirective,
    NotFoundComponent
  ],
  entryComponents: [
    DeleteComponent,
    DeleteDialogCommentComponent,
    FirstAdComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatChipsModule,
    MatPaginatorModule,
    GoTopButtonModule
  ],
  providers: [
    AuthService,
    PostService,
    CommentService,
    AdService,
    NotLoginGuard,
    SaveDataGuard,
    DatePipe,
    RelativeDatePipe,
    DateSuffixPipe,
    ShortenExcerptPipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
