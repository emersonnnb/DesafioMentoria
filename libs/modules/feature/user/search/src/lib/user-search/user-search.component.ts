import { AfterViewInit, Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';

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
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    UserFilterComponent,
    NgOptimizedImage
  ],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss',
})
export class UserSearchComponent implements OnInit, AfterViewInit {
  public readonly displayedColumns = DATATABLE;
  public readonly displayedColumnKeys = DATATABLEKEY;
  public dataSource = new MatTableDataSource<User>();
  private destroyRef = inject(DestroyRef);

  @ViewChild(MatPaginator) readonly paginator!: MatPaginator;
  @ViewChild(MatSort) readonly sort!: MatSort;

  public input!: string;

  constructor(private userSearchService: UserSearchService) {}

  public ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers() {
    this.userSearchService.getUsers()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      this.dataSource.data = res;
    });
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onFilterChange(input: string) {
    this.dataSource.filter = input.trim().toLowerCase();
    this.input = input;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
