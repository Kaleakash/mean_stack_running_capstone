import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Customer } from './customer';

import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpController : HttpTestingController
  let baseUrl:string ="http://localhost:3000/customers";
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule],
  
    });
    service = TestBed.inject(CustomerService);
    httpController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("check all customer details mock test",()=> {
    service.findAllCustomer().subscribe({
      next:(data:any)=> {
        expect(data.length).toEqual(2);
      }
    })
    
    const req = httpController.expectOne({
      method: 'GET',
      url: `${baseUrl}`,
    });

    let mockCustomer:Customer[]=[
      {"accno": 10010,
      "amount": 1750,
      "cid": 112233,
      "cname": "Raj",
      "emailid": "raj@gmail.com",
      "password": "raj@1234",
      "typeofuser": "customer",
      "gender": "male",
      "phonenumber": "9912312123",
      "address": "Nandini Layout",
      "id": 1},
      {
        "accno": 10011,
    "amount": 2550,
    "cid": 112234,
    "cname": "Seeta",
    "emailid": "seeta@gmail.com",
    "password": "seeta@123",
    "typeofuser": "customer",
    "gender": "female",
    "phonenumber": "9987612341",
    "address": "HSR Laylut",
    "id": 2
      }
    ]
    req.flush(mockCustomer);
});

});
