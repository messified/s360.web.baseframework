import { Routes, RouterModule } from '@angular/router';
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  {
    path: '', loadChildren: () => System.import('./components/customer')
      .then((comp: any) => comp.default),
  }
];
