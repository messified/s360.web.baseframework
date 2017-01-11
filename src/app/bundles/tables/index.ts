import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TablesBasic } from './tables.component';
import { TablesDynamic } from './dynamic/tables-dynamic.component';
import { SearchPipe } from './dynamic/pipes/search-pipe';
import { DatePickerModule } from 'ng2-datepicker';
import { JqSparklineModule } from './sparkline/sparkline.module';
import { DataTableModule } from 'angular2-datatable';
import { Ng2TableModule } from 'ng2-table';
import { AlertModule, TooltipModule } from 'ng2-bootstrap';
import { ButtonsModule, DropdownModule, PaginationModule  } from 'ng2-bootstrap';
import 'parsleyjs';

console.log('`Tables` bundle loaded asynchronously');
// async components must be named routes for WebpackAsyncRoute
export const routes = [
    {path: '', component: TablesBasic, pathMatch: 'full'},
    {path: 'dynamic', component: TablesDynamic, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        TablesBasic,
        TablesDynamic,
        SearchPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AlertModule.forRoot(),
        TooltipModule.forRoot(),
        ButtonsModule.forRoot(),
        DropdownModule.forRoot(),
        PaginationModule.forRoot(),
        DatePickerModule,
        DataTableModule,
        JqSparklineModule,
        Ng2TableModule,
        RouterModule.forChild(routes),
    ]
})
export default class TablesModule {
    static routes = routes;
}