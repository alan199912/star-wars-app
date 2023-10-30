import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { SearchComponent } from './components/search/search.component';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@NgModule({
  declarations: [DashboardComponent, SearchComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
  ],
})
export class DashboardModule {}
