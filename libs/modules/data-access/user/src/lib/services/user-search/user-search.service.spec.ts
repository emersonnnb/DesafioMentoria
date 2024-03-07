import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserSearchService } from './user-search.service';
import { User } from '../../models/user.model';
import { mockUsers } from '../../mocks/user.mock';

describe('UserSearchService', () => {
  let service: UserSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(UserSearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products correctly', () => {
    // ARRANGE
    const url = `${service.apiUrl}/users`;
    let result: User[] = [];

    // ACT
    service.getUsers().subscribe((users) => (result = users));

    // ASSERT
    const request = httpMock.expectOne(url);
    request.flush(mockUsers);
    expect(request.request.method).toBe('GET');
    expect(result).toEqual(mockUsers);
  });
});
