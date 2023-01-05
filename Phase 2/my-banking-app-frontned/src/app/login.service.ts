import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl:string="http://localhost:3000/login";
  constructor(public http:HttpClient) { }



  signIn():Observable<Login>{
      return this.http.get<Login>(this.baseUrl);
  }

  changePassword(login:any):Observable<Login> {
    return this.http.put<Login>(this.baseUrl,login);
  }


  // deposit(customer:any):Observable<Customer> {
  //   return this.http.put<Customer>(this.baseUrl+"/"+customer.id,customer);
  // }
}
