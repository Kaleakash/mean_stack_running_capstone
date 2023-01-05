import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchedResultComponent } from './flight-searched-result.component';

describe('FlightSearchedResultComponent', () => {
  let component: FlightSearchedResultComponent;
  let fixture: ComponentFixture<FlightSearchedResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightSearchedResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightSearchedResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
