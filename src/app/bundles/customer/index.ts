import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePickerModule } from 'ng2-datepicker';
import 'parsleyjs';
import { Customer } from './customer.component';

console.log('`Customer` bundle loaded asynchronously');
// async components must be named routes for WebpackAsyncRoute
export const routes = [
	{ path: '', component: Customer, pathMatch: 'full' }
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
	public static routes: any = routes;
}