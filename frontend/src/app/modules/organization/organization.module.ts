import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrganizationComponent, CreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrganizationRoutingModule
  ]
})
export class OrganizationModule { }
