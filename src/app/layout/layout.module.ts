import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';

import { LayoutRoutingModule }  from './layout-routing.module';

import { LayoutComponent }      from './layout.component';
import { MainPageComponent }    from './main-page/main-page.component';
import { TagPageComponent }     from './tag-page/tag-page.component';
import { PopularTagsComponent } from './../popular-tags/popular-tags.component';
import { PostsListComponent }   from './../post/list-preview/posts-list.component';
import { PostPreviewComponent } from './../post/list-preview/post-preview.component';
import { CommentsComponent }    from './../post/buttons/comments/comments.component';
import { EditDeleteComponent }  from './../post/buttons/edit-delete/edit-delete.component';
import { SocialComponent }      from './../post/buttons/social/social.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule
    ],
    declarations: [
        LayoutComponent,
        MainPageComponent,
        TagPageComponent,
        PopularTagsComponent,
        PostsListComponent,
        PostPreviewComponent,
        CommentsComponent,
        EditDeleteComponent,
        SocialComponent
    ],
    exports: [
        LayoutComponent
    ]
})
export class LayoutModule { }
