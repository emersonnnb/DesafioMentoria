import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { User } from 'libs/modules/data-access/user/src/lib/models/user.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'lib-user-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
  ],
  templateUrl: './user-filter.component.html',
  styleUrl: './user-filter.component.scss',
})
export class UserFilterComponent implements OnInit {
  @Input() dataSource!: MatTableDataSource<User>;
  @Output() filterChange = new EventEmitter<string>();

  control = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((filterValue) => {
        this.filterChange.emit(filterValue);
      });
  }
}
