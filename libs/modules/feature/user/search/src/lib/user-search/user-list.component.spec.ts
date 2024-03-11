import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { UserListComponent } from './user-list.component';
import { UserSearchService, mockUsers } from 'user-data-access';
import { of } from 'rxjs';
import { UserFilterComponent } from '../user-filter/user-filter.component';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent, UserFilterComponent, NoopAnimationsModule],
      providers: [
        {
          provide: UserSearchService,
          useValue: { getUsers: () => of(mockUsers) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`#should create ${UserListComponent.name}`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${UserListComponent.prototype.ngOnInit.name} should fetch users from ${UserListComponent.name} on initialization`, () => {
    component.ngOnInit();

    const users: HTMLElement[] =
      fixture.nativeElement.querySelectorAll('tbody tr');

    expect(users.length).toBe(mockUsers.length);
  });

  it(`#${UserListComponent.prototype.ngAfterViewInit.name} initialize the filter and table pagination`, () => {
    component.sort.active = 'id';
    component.sort.direction = 'desc';
    component.sort.sortChange.emit({
      active: component.sort.active,
      direction: component.sort.direction,
    });

    component.ngAfterViewInit();

    const user: HTMLElement =
      fixture.nativeElement.querySelector('tbody tr td');

    expect(component.dataSource.paginator?.length).toBe(mockUsers.length);
    expect(+user.textContent!).toBe(mockUsers.length);
  });

  it(`#${UserListComponent.prototype.onFilterChange.name} should search for the user entered.`, () => {
    const input: string = 'Rebecca';
    component.onFilterChange(input);

    const users: HTMLElement[] =
      fixture.nativeElement.querySelectorAll('tbody tr');

    mockUsers.filter((el) => 
      el.name.includes(input) ||
      el.id.includes(input) ||
      el.biography.includes(input) ||
      el.avatar.includes(input) ||
      el.email.includes(input));

    expect(users.length).toBe(mockUsers.length);
  });

  it(`#should filter the table based on the value of ${UserFilterComponent.name}`, () => {
    const filterValue: string = 'Rebecca';
    const userFilterComponent = fixture.debugElement.query(By.directive(UserFilterComponent));
  
    userFilterComponent.triggerEventHandler('filterChange', filterValue);
  
    fixture.detectChanges();

    expect(component.dataSource.filter).toBe(filterValue.trim().toLowerCase());
  });
});
