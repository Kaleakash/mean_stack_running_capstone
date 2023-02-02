import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl:string ="http://localhost:3000/api/customer"
  constructor(public http:HttpClient) { }

  createAccount(customer:any):Observable<any> {
    return this.http.post<any>(this.baseUrl+"/register",customer);
  }

  findCustomer(cid:any):Observable<Customer> {
    return this.http.get<Customer>(this.baseUrl+"/findCustomer/"+cid);
  }
  findAllCustomers():Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl+"/viewAllCustomer");
  }

  withdraw(customer:any):Observable<any> {
    return this.http.put<any>(this.baseUrl+"/withdrawAmount",customer);
  }

  deposit(customer:any):Observable<any> {
    return this.http.put<any>(this.baseUrl+"/depositAmount/",customer);
  }

  transaction(customer:any):Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl,customer);
  }
  
  // findAllCustomer():Observable<Customer[]> {
  //   return this.http.get<Customer[]>(this.baseUrl);
  // }

  changePassword(customer:any):Observable<any> {
    return this.http.put<any>(this.baseUrl+"/changePassword",customer);
  }
}
