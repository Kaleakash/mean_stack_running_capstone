import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Transaction } from './transaction';

import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpController : HttpTestingController
  let baseUrl:string ="http://localhost:3000/transaction";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule]
    });
    service = TestBed.inject(TransactionService);
    httpController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("check all transaction details mock test",()=> {
    service.findAllTransactionDetails().subscribe({
      next:(data:any)=> {
        expect(data.length).toEqual(3);
      }
    })
    
    const req = httpController.expectOne({
      method: 'GET',
      url: `${baseUrl}`,
    });

    let mockTransaction:Transaction[]=[
      { "cid": 112233,
      "cname": "Raj",
      "emailid": "raj@gmail.com",
      "accno": 10010,
      "amount": 300,
      "typeoftransaction": "Withdraw",
      "dot": "2023-01-05T08:03:33",
      "transferTo": 0,
      "id": 1},
      {
        "cid": 112233,
    "cname": "Raj",
    "emailid": "raj@gmail.com",
    "accno": 10010,
    "amount": 500,
    "typeoftransaction": "Deposit",
    "dot": "2023-01-05T08:04:17",
    "transferTo": 0,
    "id": 2
      },{
        "cid": 112233,
    "cname": "Raj",
    "emailid": "raj@gmail.com",
    "accno": 10010,
    "amount": 300,
    "typeoftransaction": "Deposit",
    "dot": "2023-01-05T08:04:22",
    "transferTo": 0,
    "id": 3
      }
    ]
    req.flush(mockTransaction);
});
});
