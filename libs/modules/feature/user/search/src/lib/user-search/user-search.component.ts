import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort } from '@angular/material/sort';

import { UserSearchService } from 'user-data-access';
import { DATATABLE, DATATABLEKEY } from '../constant/user-list.const';
import { User } from 'libs/modules/data-access/user/src/lib/models/user.model';
import { UserFilterComponent } from '../user-filter/user-filter.component';

@Component({
  selector: 'lib-user-search',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    UserFilterComponent,
  ],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss',
})
export class UserSearchComponent implements OnInit, AfterViewInit {
  displayedColumns = DATATABLE;
  displayedColumnKeys = DATATABLEKEY;
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public input!: string;

  constructor(private userSearchService: UserSearchService) {}

  ngOnInit(): void {
    this.userSearchService.getUsers().subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onFilterChange(event: string) {
    this.input = event;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
