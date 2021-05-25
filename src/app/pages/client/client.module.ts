import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { IConfig, NgxMaskModule } from 'ngx-mask';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ClientService } from 'src/app/services/client.service';
import { DetailComponent } from './detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    ClientComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ComponentsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [ClientService]
})
export class ClientModule { }
