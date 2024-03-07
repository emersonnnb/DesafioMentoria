import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from 'product-ui';
import { LogDirective } from './directives/log/log.directive';
import { HomeComponent } from './home/home.component';
import { homeRoutes } from './lib.routes';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    ProductCardComponent,
    LogDirective,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
