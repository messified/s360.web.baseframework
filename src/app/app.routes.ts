import {Routes, RouterModule} from '@angular/router';
import {DataResolver} from './app.resolver';


export const ROUTES: Routes = [
	{
		path: '', redirectTo: 'app', pathMatch: 'full'
	},
	{
		path: 'app', loadChildren: () => System.import('./bundles/demo')
		.then((comp: any) => comp.default),
	},
	{
		path: 'app/customer', loadChildren: () => System.import('./bundles/customer')
			.then((comp: any) => comp.default),
	}
];
