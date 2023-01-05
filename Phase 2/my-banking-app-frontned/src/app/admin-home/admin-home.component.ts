import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Login } from '../login';
import { LoginService } from '../login.service';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  custRef = new FormGroup({
    customerid:new FormControl(),
    accnumber:new FormControl(),
    phnumber:new FormControl()
  });
  adminRef = new FormGroup({
    oldPassword:new FormControl("",[Validators.required]),
    newPassword:new FormControl("",[Validators.required]),
    rewriteNewPassword:new FormControl("",[Validators.required])
  });

  customerDetails:Array<Customer>=[];
  customerInfo?:any;
  flag:boolean = false;
  admin?:any;
  constructor(public router:Router,public cs:CustomerService,
    public ts:TransactionService,public ls:LoginService) { }

  transactionDetails:Array<Transaction>=[];
  ngOnInit(): void {
    let obj = sessionStorage.getItem("adminLogin");
    if(obj!=undefined){
        this.admin  = JSON.parse(obj);
    }
    console.log(this.admin);
    AOS.refreshHard();
    this.findAllCustomerDetails();
    this.findAllTransactionDetails();
  }
  changePassword(){
    
    this.admin.password= this.adminRef.get("newPassword")?.value;
    
    console.log(this.admin)
    this.ls.changePassword(this.admin).subscribe({
      next:(data:any)=> {
          console.log(data);
      },
      error:(error:any)=>console.log(error),
      complete:()=>console.log("change done!")
    });

    this.adminRef.reset();
  }
  logout(){
    sessionStorage.removeItem("adminLogin");
    this.router.navigate(["/home"]).then(()=> {
      window.location.reload();
      window.scrollTo(0,0);
    })
  }

  findAllCustomerDetails() {
    this.cs.findAllCustomer().subscribe({
      next:(data:any)=> {
          this.customerDetails= data;
      },
      error:(error:any)=>console.log(error),
      complete:()=>console.log("Loaded all customer details")
    })
  }

  findAllTransactionDetails() {
    this.ts.findAllTransactionDetails().subscribe({
      next:(data:any)=> {
          this.transactionDetails=data;
      },
      error:(error:any)=>console.log(error),
      complete:()=>console.log("completed")
    })
  }

  searchCustomerInfo(): void {
    this.flag= true;
    let customer = this.custRef.value;
    let searchedCustomer = this.customerDetails.find(c=>c.cid==customer.customerid || c.accno==customer.accnumber || c.phonenumber==customer.phnumber);
    if(searchedCustomer==undefined){
        this.customerInfo="No Customer Details Found"
    }else {
        this.customerInfo = searchedCustomer;
    }

    this.custRef.reset();
  }
}
