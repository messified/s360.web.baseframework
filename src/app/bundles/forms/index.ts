import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Elements } from './elements/elements.component';
import { Validation } from "./validation/validation.component";
import { DatePickerModule } from 'ng2-datepicker';
import { TooltipModule, AlertModule, DropdownModule } from 'ng2-bootstrap';
import { Select2Module } from 'ng2-select2';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { TextMaskModule } from 'angular2-text-mask';
import 'bootstrap-markdown/js/bootstrap-markdown.js';
import 'bootstrap-select/dist/js/bootstrap-select.js';
import 'select2/dist/js/select2.js';
import 'jasny-bootstrap/docs/assets/js/vendor/holder.js';
import 'jasny-bootstrap/js/fileinput.js';
import 'ng2-datetime/src/vendor/bootstrap-datepicker/bootstrap-datepicker.min.js';
import 'ng2-datetime/src/vendor/bootstrap-timepicker/bootstrap-timepicker.min.js';
import 'bootstrap-colorpicker';
import 'bootstrap-slider/dist/bootstrap-slider.js';
import 'jasny-bootstrap/docs/assets/js/vendor/holder.js';
import 'jasny-bootstrap/js/fileinput.js';
import 'jasny-bootstrap/js/inputmask.js';
import 'parsleyjs';

declare var global: any;
// libs
/* tslint:disable */
var markdown = require('markdown').markdown;
/* tslint:enable */
global.markdown = markdown;

console.log('`Forms Element` bundle loaded asynchronously');
// async components must be named routes for WebpackAsyncRoute
export const routes = [
  {path: '', redirectTo: 'validation', pathMatch: 'full'},
  {path: 'elements', component: Elements, pathMatch: 'full'},
  {path: 'validation', component: Validation, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    Elements,
    Validation
  ],
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    DropdownModule.forRoot(),
    DatePickerModule,
    Select2Module,
    NKDatetimeModule,
    TextMaskModule,
    RouterModule.forChild(routes),
  ]
})
export default class FormExampleModule {
  static routes = routes;
}