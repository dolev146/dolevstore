import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingsidenavadminComponent } from './buyingsidenavadmin.component';

describe('BuyingsidenavadminComponent', () => {
  let component: BuyingsidenavadminComponent;
  let fixture: ComponentFixture<BuyingsidenavadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyingsidenavadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyingsidenavadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
