import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[HttpClientTestingModule,HttpClientModule,ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test initial customer number and accnumber 
  it("check initial customer and account number ",()=> {
    expect(component.initialAccountNumber).toBe(10010);
    expect(component.initialCustomerNumber).toBe(112233);
  })

  // check admin user details 
  it("check admin login details after set intial value",()=> {
   
      component.loginRef.setValue({"emailid":"admin@gmail.com","password":"admin@123","typeofuser":"admin@123"});
      expect(component.customerRef.valid).toEqual(true);

  })

  it("check admin login details after without set intial value",()=> {
   
    component.loginRef.setValue({"emailid":"","password":"","typeofuser":""});
    expect(component.customerRef.valid).toEqual(true);

  })



  // check customer details 
});
