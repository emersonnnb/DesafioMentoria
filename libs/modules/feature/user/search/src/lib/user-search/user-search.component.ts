import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { UserSearchService } from 'user-data-access';
import { Observable } from 'rxjs';
import { User } from 'libs/modules/data-access/user/src/lib/models/user.model';

@Component({
  selector: 'lib-user-search',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss',
})
export class UserSearchComponent implements OnInit {
  displayedColumns: string[] = ['id', 'avatar', 'name', 'email', 'biography'];
  dataSource!: User[];
  users$!: Observable<User[]>;

  constructor(private userSearchService: UserSearchService) {}

  ngOnInit(): void {
    this.users$ = this.userSearchService.getUsers();

    this.users$.subscribe((result) => {
      this.dataSource = result;
    });
    
  }
}
