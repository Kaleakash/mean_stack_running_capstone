import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl:string ="http://localhost:3000/customers"
  constructor(public http:HttpClient) { }

  createAccount(customer:any):Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl,customer);
  }

  findCustomer(cid:any):Observable<Customer> {
    return this.http.get<Customer>(this.baseUrl+"/"+cid);
  }
  findAllAccount():Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  withdraw(customer:any):Observable<Customer> {
    return this.http.put<Customer>(this.baseUrl+"/"+customer.id,customer);
  }

  deposit(customer:any):Observable<Customer> {
    return this.http.put<Customer>(this.baseUrl+"/"+customer.id,customer);
  }

  transaction(customer:any):Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl,customer);
  }
  
  findAllCustomer():Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  changePassword(customer:any):Observable<Customer> {
    return this.http.put<Customer>(this.baseUrl+"/"+customer.id,customer);
  }
}
