import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule }         from '@angular/common'

import { LayoutComponent }      from './layout.component';
import { TagPageComponent }     from './tag-page/tag-page.component';
import { MainPageComponent }    from './main-page/main-page.component';

const layoutRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: MainPageComponent },
            { path: 'tag/:tag', component: TagPageComponent }
        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(layoutRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class LayoutRoutingModule{
    constructor(){
        console.log('in the routing module layout');
    }
}