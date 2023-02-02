import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { CustomerHomeComponent } from './customer-home.component';
import { HttpClientModule } from '@angular/common/http';
import { Customer } from '../customer';

describe('CustomerHomeComponent', () => {
  let component: CustomerHomeComponent;
  let fixture: ComponentFixture<CustomerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerHomeComponent ],
      imports:[HttpClientTestingModule,HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerHomeComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it("check customer details",()=> {
    expect(component.customer).toEqual(undefined);
  })

  it("check all transaction details",async ()=> {
    let customer:Customer={};
    customer.accno=10010;
    await component.findAllTransactionDetails();
    expect(component.transactionDetails.length).toEqual(0);
  })

});
