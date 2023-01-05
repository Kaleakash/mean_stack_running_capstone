import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginRef = new FormGroup({
    emailid:new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required]),
    typeofuser:new FormControl("",[Validators.required])
    });

  customerRef = new FormGroup({
    id:new FormControl(),
    name:new FormControl(),
    emailid:new FormControl(),
    password:new FormControl(),
    repeatpassword:new FormControl(),
    typeofuser:new FormControl(),
    gender:new FormControl(),
    phonenumber:new FormControl(),
    address:new FormControl()
  });

  initialCustomerNumber:number = 112233;  
  initialAccountNumber:number = 10010;
  
  constructor(public ls:LoginService,public router:Router,public cs:CustomerService) { }

  ngOnInit(): void {
    AOS.refreshHard();
  }


  // login admin as well as customer 
  signIn():void {
    let login = this.loginRef.value;
    
    // admin login check 
    if(login.typeofuser=="admin"){
      this.ls.signIn().subscribe({
        next:(data:any)=> {
              if(data.emailid==login.emailid && data.password==login.password && data.typeofuser==login.typeofuser){           
                  this.router.navigate(["/adminHome"]).then(() => {
                    sessionStorage.setItem("adminLogin",JSON.stringify(data));
                    window.location.reload();
                    window.scrollTo(0,0);
                  });
              }else {
                  alert("Failure try once again")
              }
        },
        error:(error:any)=>console.log(error),
        complete:()=>console.log("Admin login done!")
      })
    }else {
        this.cs.findAllAccount().subscribe({
          next:(data:any)=> {
              let result = data.find((l:any)=>l.emailid==login.emailid && l.password==login.password);
              if(result!=undefined){
                sessionStorage.setItem("customer",JSON.stringify(result));
                this.router.navigate(["/customerHome"]).then(() => {
                  window.location.reload();
                  window.scrollTo(0,0);
                });
              }else {
                alert("failure try once again")
              }
          },
          error:(error:any)=>console.log(error),
          complete:()=>console.log("Customer login done!")
        })
    }
     
    this.loginRef.reset();
  }

  signUp() : void {
    let customer = this.customerRef.value;
    customer.typeofuser="customer";
  
   //check previous account details and created new account number and customer number 
    this.cs.findAllAccount().subscribe({
      next:(totalAccount:any)=>{
          this.initialAccountNumber = this.initialAccountNumber+totalAccount.length;
          this.initialCustomerNumber=this.initialCustomerNumber+totalAccount.length;
      },
      error:(error:any)=>console.log(error),
      complete:()=>{
          let tempCustomer:Customer ={};
          tempCustomer.accno=this.initialAccountNumber;
          tempCustomer.amount=500;
          tempCustomer.cid=this.initialCustomerNumber;
          tempCustomer.cname=customer.name;
          tempCustomer.emailid=customer.emailid;
          tempCustomer.password=customer.password;
          tempCustomer.typeofuser=customer.typeofuser;
          tempCustomer.gender= customer.gender;
          tempCustomer.phonenumber= customer.phonenumber;
          tempCustomer.address= customer.address;

        // create new account with customer details  
        this.cs.createAccount(tempCustomer).subscribe({
        next:(result:any)=>{
          console.log(result);
          alert("Account Created successfully")
        },
        error:(error:any)=>console.log(error),
        complete:()=>{
          //sessionStorage.setItem("account",JSON.stringify(account));
            
            console.log("completed")
          
          }
        });
      }

    })
    
    this.customerRef.reset();    

  }


}
