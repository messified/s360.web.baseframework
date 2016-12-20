import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseComponent } from './base.component';

console.log('`Base` bundle loaded asynchronously');
// async components must be named routes for WebpackAsyncRoute
export const routes = [
    { path: '', component: BaseComponent, pathMatch: 'full' }
];

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        BaseComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ]
})
export default class BaseModule {
    static routes = routes;
}
