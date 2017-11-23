import { RouterModule, Routes } from '@angular/router';

// components
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';
import { Page1Component } from './page1/page1.component';

const appRouting: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'index',
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'page1',
    component: Page1Component
  },
  {
    path: '**',
    component: Http404Component
  }
];

export const appRoutes = RouterModule.forRoot(appRouting, { useHash: true });