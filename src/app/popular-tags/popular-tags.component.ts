import { Component }   from '@angular/core';
import { OnInit }      from '@angular/core/src/metadata/lifecycle_hooks';

import { Tag }         from './../models/tag';
import { PostService } from './../post/post.service';


@Component({
    selector: 'app-popular-tags',
    templateUrl: './popular-tags.component.html'
})

export class PopularTagsComponent implements OnInit {
    public tags: Tag[];

    constructor(
        private postService: PostService
    ) { }

    ngOnInit() {
        this.getPopularTags();
    }

    getPopularTags(): void {
        this.postService.getPopularTags()
            .subscribe(tags => this.tags = tags);
    }
}