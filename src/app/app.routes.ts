import { Routes, RouterModule } from '@angular/router';
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
    {
        path: '', redirectTo: 'app/customer', pathMatch: 'full'
    },
    {
        path: 'app/customer', loadChildren: () => System.import('./bundles/customer')
        .then((comp: any) => comp.default),
    }
];
