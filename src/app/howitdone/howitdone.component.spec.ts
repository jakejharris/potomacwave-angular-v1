import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowitdoneComponent } from './howitdone.component';

describe('HowitdoneComponent', () => {
  let component: HowitdoneComponent;
  let fixture: ComponentFixture<HowitdoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowitdoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowitdoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
