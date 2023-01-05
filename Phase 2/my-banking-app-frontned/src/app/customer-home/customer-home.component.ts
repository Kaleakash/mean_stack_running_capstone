import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {
 customer:any;
 tranRef = new FormGroup({
  id:new FormControl(),
  cid:new FormControl(),
  cname:new FormControl(),
  accno:new FormControl(),
  amount:new FormControl(),
  emailid:new FormControl(),
  typeoftransaction:new FormControl(),
  dot:new FormControl(),
  transferTo:new FormControl()
 });

 custRef = new FormGroup({
  oldPassword:new FormControl("",[Validators.required]),
  newPassword:new FormControl("",[Validators.required]),
  repeatNewPassword:new FormControl("",[Validators.required])
 });

 transactionDetails:Array<Transaction>=[];
  constructor(public router:Router,public cs:CustomerService,
    public ts:TransactionService) { }

  ngOnInit(): void {
    AOS.refreshHard();
    let obj = sessionStorage.getItem("customer");
    console.log(obj)
    if(obj!=null){
        this.customer = JSON.parse(obj);
    }

    this.findAllTransactionDetails();
  }

  findAllTransactionDetails() {
    this.ts.findAllTransactionDetails().subscribe({
      next:(data:any)=> {
            let customerTransactionDetails = data.filter((tran:any)=>tran.accno==this.customer.accno);
            console.log(customerTransactionDetails.length);
            this.transactionDetails= customerTransactionDetails;
      },
      error:(error:any)=>console.log(error),
      complete:()=>console.log("transaction detaild loaded...")
    })
  }
  logout(){
    sessionStorage.removeItem("customer");
    this.router.navigate(["/home"]).then(()=> {
      window.location.reload();
      window.scrollTo(0,0);
    })
  }
  findCustomer(){
    this.cs.findCustomer(this.customer.id).subscribe({
      next:(result:any)=> {
            this.customer = result;
      },
      error:(error:any)=>console.log(error),
      complete:()=>console.log("find customer details")
    })
  }
  deposit(){
    let customer:Customer = {};
    let transaction:Transaction={};
    customer = this.customer;
    
    customer.amount = this.customer.amount + this.tranRef.get("amount")?.value;
    this.cs.deposit(customer).subscribe({
      next:(result:any)=> {
          console.log(result);
      },
      error:(error:any)=>console.log(error),
      complete:()=>{

        this.findCustomer();
        console.log("deposit done successfully");

        transaction.cid= customer.cid;
        transaction.cname = customer.cname;
        transaction.emailid= customer.emailid;
        transaction.accno = customer.accno;
        transaction.amount = this.tranRef.get("amount")?.value;
        transaction.typeoftransaction = "Deposit";
        transaction.dot =  new Date().toISOString().slice(0, 19);
        transaction.transferTo=0;
          this.ts.storeTransactionDetails(transaction).subscribe({
            next:(data:any)=> {
                console.log(data);
            },
            error:(error:any)=>console.log(error),
            complete:()=>{
              
              console.log("transaction details stored successfully")
              this.tranRef.reset();
              this.findAllTransactionDetails();  
            }
          })
          
        }
    })
   }
  withdraw() {
    let customer:Customer = {};
    let transaction:Transaction={};
    customer = this.customer;
    customer.amount = this.customer.amount - this.tranRef.get("amount")?.value;
    this.cs.withdraw(customer).subscribe({
      next:(result:any)=> {
          console.log(result);
      },
      error:(error:any)=>console.log(error),
      complete:()=>{
        this.findCustomer();
        console.log("withdraw done successfully");


        transaction.cid= customer.cid;
        transaction.cname = customer.cname;
        transaction.emailid= customer.emailid;
        transaction.accno = customer.accno;
        transaction.amount = this.tranRef.get("amount")?.value;
        transaction.typeoftransaction = "Withdraw";
        transaction.dot =  new Date().toISOString().slice(0, 19);
        transaction.transferTo=0;
          this.ts.storeTransactionDetails(transaction).subscribe({
            next:(data:any)=> {
                console.log(data);
            },
            error:(error:any)=>console.log(error),
            complete:()=>{
              
              console.log("transaction details stored successfully")
              this.tranRef.reset();
              this.findAllTransactionDetails();
            }
          })

        }
    })
    //this.tranRef.reset();
  }
  transfer() {
    let customer:Customer = {};
    let transaction:Transaction={};
    customer = this.customer;
    console.log(this.tranRef.get("transferTo")?.value)
    customer.amount = this.customer.amount - this.tranRef.get("amount")?.value;
    console.log(customer);  
    this.cs.withdraw(customer).subscribe({
      next:(result:any)=> {
          console.log("withdraw done successfully");
      },
      error:(error:any)=>console.log(error),
      complete:()=>{
      
        //find customer details using account number ie accno is not pk. 
            this.cs.findAllCustomer().subscribe({
              next:(data:any)=> {
                customer.transferTo = this.tranRef.get("transferTo")?.value;  
                  console.log(data);
                  console.log(customer.transferTo)
                  var transferCustomerDetails:Customer = data.find((c:any)=>c.accno==customer.transferTo);
                 console.log(transferCustomerDetails);
                  if(transferCustomerDetails!=undefined && transferCustomerDetails.amount != undefined && customer.amount!=undefined){
                    transferCustomerDetails.amount = transferCustomerDetails.amount + this.tranRef.get("amount")?.value;
                    this.cs.deposit(transferCustomerDetails).subscribe({
                      next:(data:any)=> {
                          console.log(data);
                      },
                      error:(error:any)=>console.log(error),
                      complete:()=>{
                        
                      
                        
                        transaction.cid= customer.cid;
                        transaction.cname = customer.cname;
                        transaction.emailid= customer.emailid;
                        transaction.accno = customer.accno;
                        transaction.amount = this.tranRef.get("amount")?.value;
                        transaction.typeoftransaction = "Transfer";
                        transaction.dot =  new Date().toISOString().slice(0, 19);
                        transaction.transferTo=transferCustomerDetails.accno;
                        this.ts.storeTransactionDetails(transaction).subscribe({
                        next:(data:any)=> {
                        console.log(data);
                        },
                        error:(error:any)=>console.log(error),
                        complete:()=>{
                        console.log("Inner Inner Inner subscription - transaction details stored successfully")
                        this.tranRef.reset();

                        this.findAllTransactionDetails();

                        }
                        })


                        console.log("Inner Inner subscription - Transfer done successfully!")
                      }
                    })
                  }
              },
              error:(error:any)=>console.log(error),
              complete:()=>{
                console.log("Inner subscription ")

              }
            })

        this.findCustomer();
        console.log("Outer subsription");
        
        }
    })

   }

   changePassword() {
    let cust = this.custRef.value;
    console.log(this.customer);
    this.customer.password = cust.newPassword;
    this.cs.changePassword(this.customer).subscribe({
      next:(data:any)=> {
          console.log(data);
      },
      error:(error:any)=>console.log(error),
      complete:()=>console.log("change done!")
    });
    this.custRef.reset();
   }
}
