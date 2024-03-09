import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { UserSearchService } from 'user-data-access';

@Component({
  selector: 'lib-user-search',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss',
})
export class UserSearchComponent {
  displayedColumns: string[] = ['id', 'avatar', 'name', 'email', 'biography'];
  users$ = this.userSearchService.getUsers();

  constructor(private userSearchService: UserSearchService) {}
}
