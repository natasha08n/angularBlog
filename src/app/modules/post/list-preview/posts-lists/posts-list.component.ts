import { Component, Input }       from '@angular/core';
  
import { Post }                   from './../../../../shared/models/post';
import { PostPreviewComponent }   from './../post-preview/post-preview.component';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})

export class PostsListComponent {
  @Input() posts: Post[];
}
