import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { LayoutModule } from 'layout';
import { UserListComponent } from 'user-search';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, LayoutModule, UserListComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ecommerce-admin';
}
