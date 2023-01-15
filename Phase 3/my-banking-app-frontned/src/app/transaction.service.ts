import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl:string ="http://localhost:3000/api/transaction"
  constructor(public http:HttpClient) { }

  storeTransactionDetails(transaction:any):Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl+"/storeTransaction",transaction);
  }

  findAllTransactionDetails():Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl+"/findAllTransaction");
  }

  
}
