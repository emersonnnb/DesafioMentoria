import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
  } from '@angular/core/testing';
  import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserSearchComponent } from './user-search.component';
import { UserListComponent } from '../user-list/user-list.component';
import { mockUsers } from 'user-data-access';
import { MatTableDataSource } from '@angular/material/table';
  
  describe('UserSearchComponent', () => {
    let component: UserSearchComponent;
    let fixture: ComponentFixture<UserSearchComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [UserSearchComponent, UserListComponent, NoopAnimationsModule],
      }).compileComponents();
  
      fixture = TestBed.createComponent(UserSearchComponent);
      component = fixture.componentInstance;

      component.dataSource = new MatTableDataSource(mockUsers);

      fixture.detectChanges();
    });
  
    it(`#should create ${UserSearchComponent.name}`, () => {
      expect(component).toBeTruthy();
    });
  
    it(`#${UserSearchComponent.name} should debounce when input field is changed`, fakeAsync(() => {
        const name: string = 'li';
        const input: HTMLInputElement =
          fixture.nativeElement.querySelector('input');
        input.value = name;
        jest.spyOn(component.filterChange, 'emit').mockImplementation(() => name);
      input.dispatchEvent(new Event('input'));
      expect(component.filterChange.emit).not.toHaveBeenCalled();
      tick(500);
      expect(component.filterChange.emit).toHaveBeenCalledWith(input.value);
    }));
  
    it(`#${UserSearchComponent.name} should search multiple times`, fakeAsync(() => {
        const name1: string = 'Rebecca';
        const name2: string = 'Kuhic';
      const input: HTMLInputElement =
        fixture.nativeElement.querySelector('input');
      input.value = name1;
      jest.spyOn(component.filterChange, 'emit').mockImplementation(() => name1);
      input.dispatchEvent(new Event('input'));
      tick(500);
      expect(component.filterChange.emit).toHaveBeenCalledWith(name1);
      input.value = name2;
      jest.spyOn(component.filterChange, 'emit').mockImplementation(() => name2);
      input.dispatchEvent(new Event('input'));
      tick(500);
      
      expect(component.filterChange.emit).toHaveBeenCalledWith(name2);
      expect(component.filterChange.emit).toHaveBeenCalledTimes(2);
    }));
  
    it(`#${UserSearchComponent.name} should prevent identical emissions`, fakeAsync(() => {
        const name: string = 'Kuhic';
      const input: HTMLInputElement =
        fixture.nativeElement.querySelector('input');
      input.value = name;
      jest.spyOn(component.filterChange, 'emit').mockImplementation(() => name);
      input.dispatchEvent(new Event('input'));
      tick(500);
  
      input.value = name;
      input.dispatchEvent(new Event('input'));
      tick(500);
  
      expect(component.filterChange.emit).toHaveBeenCalledTimes(1);
    }));
  });
  