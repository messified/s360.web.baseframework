import { Routes, RouterModule } from '@angular/router';
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  {
    path: '', loadChildren: () => System.import('./base')
      .then((comp: any) => comp.default),
  }
];
