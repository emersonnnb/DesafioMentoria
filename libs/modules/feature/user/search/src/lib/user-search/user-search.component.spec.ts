import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { UserSearchComponent } from './user-search.component';
import { UserSearchService, mockUsers } from 'user-data-access';
import { of } from 'rxjs';
import { UserFilterComponent } from '../user-filter/user-filter.component';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSearchComponent, UserFilterComponent, NoopAnimationsModule],
      providers: [
        {
          provide: UserSearchService,
          useValue: { getUsers: () => of(mockUsers) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`#should create ${UserSearchComponent.name}`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${UserSearchComponent.prototype.ngOnInit.name} should fetch users from ${UserSearchComponent.name} on initialization`, () => {
    component.ngOnInit();

    const users: HTMLElement[] =
      fixture.nativeElement.querySelectorAll('tbody tr');

    expect(users.length).toBe(mockUsers.length);
  });

  it(`#${UserSearchComponent.prototype.ngAfterViewInit.name} initialize the filter and table pagination`, () => {
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

  it(`#${UserSearchComponent.prototype.onFilterChange.name} should search for the user entered.`, () => {
    const input: string = 'Rebecca';
    component.onFilterChange(input);

    const users: HTMLElement[] =
      fixture.nativeElement.querySelectorAll('tbody tr');

    mockUsers.filter((el) => el.name === input);

    expect(users.length).toBe(mockUsers.length);
  });
});
