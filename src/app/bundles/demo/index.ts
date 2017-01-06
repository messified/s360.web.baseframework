import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Base } from './base.component';

console.log('`Demo` bundle loaded asynchronously');
// async components must be named routes for WebpackAsyncRoute
export const routes = [
    { path: '', component: Base, pathMatch: 'full' }
];

@NgModule({
    declarations: [
        Base
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ]
})
export default class BaseModule {
    static routes = routes;
}