import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { UserSearchService } from 'user-data-access';
import { User } from 'libs/modules/data-access/user/src/lib/models/user.model';

@Component({
  selector: 'lib-user-search',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss',
})
export class UserSearchComponent {
  displayedColumns: string[] = ['id', 'avatar', 'name', 'email', 'biography'];
  dataSource!: User[];
  users$ = this.userSearchService.getUsers();

  constructor(private userSearchService: UserSearchService) {}
}
