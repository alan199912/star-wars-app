import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultPageComponent } from './search-result-page.component';

const routes: Routes = [{ path: '', component: SearchResultPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchResultPageRoutingModule {}
