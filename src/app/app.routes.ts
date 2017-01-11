import { RouterModule, Routes } from '@angular/router';
import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
	{
		path: '', redirectTo: 'app/customer', pathMatch: 'full'
	},
	{
		path: 'app/customer', loadChildren: () => System.import('./bundles/customer')
			.then((comp: any) => comp.default),
	},
	{
		path: 'app/forms', loadChildren: () => System.import('./bundles/forms')
			.then((comp: any) => comp.default),
	},
	{
		path: 'app/tables', loadChildren: () => System.import('./bundles/tables')
			.then((comp: any) => comp.default),
	}
];
