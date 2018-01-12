import { Component, Input }       from '@angular/core';
  
import { Post }                   from './../../models/post';
import { PostPreviewComponent }   from './post-preview.component';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})

export class PostsListComponent {
  @Input() posts: Post[];
}
