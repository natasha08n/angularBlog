import { Injectable, NgModule, CUSTOM_ELEMENTS_SCHEMA }    from '@angular/core';
import { CommonModule }            from '@angular/common';
import { FormsModule }             from '@angular/forms';
import { HttpModule }              from '@angular/http';
import { HttpClientModule }        from '@angular/common/http';

import { PostService }             from './post.service';

const schemas: any[] = [];
schemas.push(CUSTOM_ELEMENTS_SCHEMA);

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        HttpClientModule
    ],
    providers: [
        PostService
    ],
    schemas: schemas
})

export class PostModule {}
