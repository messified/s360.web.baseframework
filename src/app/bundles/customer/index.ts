import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Customer } from './customer.component';
import { DatePickerModule } from 'ng2-datepicker';
import 'parsleyjs';

console.log('`Customer` bundle loaded asynchronously');
// async components must be named routes for WebpackAsyncRoute
export const routes = [
    {path: '', component: Customer, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        Customer,
    ],
    imports: [
        CommonModule,
        FormsModule,
        DatePickerModule,
        RouterModule.forChild(routes),
    ]
})
export default class CustomerModule {
    static routes = routes;
}