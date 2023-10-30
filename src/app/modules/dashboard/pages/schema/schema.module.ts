import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemaRoutingModule } from './schema-routing.module';
import { SchemaComponent } from './schema.component';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { SchemaInfoComponent } from './schema-info/schema-info.component';

@NgModule({
  declarations: [SchemaComponent, SchemaInfoComponent],
  imports: [CommonModule, SchemaRoutingModule, CardComponent, LoadingComponent],
})
export class SchemaModule {}
