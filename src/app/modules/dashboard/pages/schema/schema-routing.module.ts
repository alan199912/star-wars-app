import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchemaComponent } from './schema.component';
import { SchemaInfoComponent } from './schema-info/schema-info.component';

const routes: Routes = [
  { path: '', component: SchemaComponent },
  { path: ':id', component: SchemaInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchemaRoutingModule {}
