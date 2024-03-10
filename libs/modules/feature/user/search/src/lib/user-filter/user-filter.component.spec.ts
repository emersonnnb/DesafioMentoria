import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
  } from '@angular/core/testing';
  import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserFilterComponent } from './user-filter.component';
import { UserSearchComponent } from '../user-search/user-search.component';
import { mockUsers } from 'user-data-access';
import { MatTableDataSource } from '@angular/material/table';
  
  describe('UserFilterComponent', () => {
    let component: UserFilterComponent;
    let fixture: ComponentFixture<UserFilterComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [UserFilterComponent, UserSearchComponent, NoopAnimationsModule],
      }).compileComponents();
  
      fixture = TestBed.createComponent(UserFilterComponent);
      component = fixture.componentInstance;

      component.dataSource = new MatTableDataSource(mockUsers);

      fixture.detectChanges();
    });
  
    it(`#should create ${UserFilterComponent.name}`, () => {
      expect(component).toBeTruthy();
    });
  
    it(`#${UserFilterComponent.name} should debounce when input field is changed`, fakeAsync(() => {
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
  
    it(`#${UserFilterComponent.name} should search multiple times`, fakeAsync(() => {
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
  
    it(`#${UserFilterComponent.name} should prevent identical emissions`, fakeAsync(() => {
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
  