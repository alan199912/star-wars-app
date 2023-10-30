import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'search-result',
    loadChildren: () =>
      import('./pages/search-result-page/search-result-page.module').then(
        (m) => m.SearchResultPageModule
      ),
  },
  {
    path: ':schema',
    loadChildren: () => import('./pages/schema/schema.module').then((m) => m.SchemaModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
