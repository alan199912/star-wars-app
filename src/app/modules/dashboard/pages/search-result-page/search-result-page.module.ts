import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultPageRoutingModule } from './search-result-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { SearchResultPageComponent } from './search-result-page.component';
import { CardComponent } from 'src/app/shared/components/card/card.component';

@NgModule({
  declarations: [SearchResultPageComponent],
  imports: [
    CommonModule,
    SearchResultPageRoutingModule,
    CardComponent,
    LoadingComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SearchResultPageModule {}
