import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchComponent } from './user-search.component';
import { UserSearchService, mockUsers } from 'user-data-access';
import { of } from 'rxjs';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSearchComponent],
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

  it(`#should fetch users from ${UserSearchComponent.name} on initialization`, () => {
    const users: HTMLElement[] =
      fixture.nativeElement.querySelectorAll('tbody tr');
    expect(users.length).toBe(mockUsers.length);
  });
});
