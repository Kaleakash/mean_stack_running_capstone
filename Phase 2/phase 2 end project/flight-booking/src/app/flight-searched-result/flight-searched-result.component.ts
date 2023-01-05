import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Flight } from '../flight';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-flight-searched-result',
  templateUrl: './flight-searched-result.component.html',
  styleUrls: ['./flight-searched-result.component.css']
})
export class FlightSearchedResultComponent implements OnInit {
  pnrNumber = Math.random().toString(36).slice(2)
  flight_data:Array<Flight>=[];
  customer_info:any=null;
  flight:any;
  flag1:number =0;;
 
  customerInfo:FormGroup=new FormGroup({});
  bookingFlag:boolean = false;
  bookingResult:string ="";
  bookingDate = new Date(); 
  customer:any;
adultsData =[
    {"label":"FirstPerson"},
    {"label":"SecondPerson"},
    {"label":"ThirdPerson"}
]
childrenData=[
  {"label":"FirstChild"},
  {"label":"SecondChild"}
]
form:any = {};
airportData=new Map();
flightClass=new Map();
  constructor() { }

  ngOnInit(): void {
    this.flightClass.set("economy class",10);
    this.flightClass.set("business class",25);
    this.flightClass.set("first class",40);
    this.airportData.set("MAD","Madrid");
    this.airportData.set("BCN","Barcelona");
    this.airportData.set("LHR","London");
    this.airportData.set("CDG","Paris");
    this.airportData.set("FRA","Frakfurt");
    this.airportData.set("IST","Istanbul");
    this.airportData.set("AMS","Amsterdam");
    this.airportData.set("FCO","Rome");
    this.airportData.set("CPH","Copenhagen");
    console.log(this.airportData.get("CPH"))
    let flight_data = sessionStorage.getItem("flight-data");
    let customer_info = sessionStorage.getItem("customer-info");
    if(flight_data!=null){
        this.flight_data=JSON.parse(flight_data);
    }
    if(customer_info!=null){
        this.customer_info=JSON.parse(customer_info);
    }
  }


  bookTicket(flight:any){
    this.flight=flight;
 this.flag1=1;
    
    console.log(this.customer_info);

    for(let i=0;i<this.customer_info.adults;i++){
      this.form[this.adultsData[i].label]=new FormControl("");
      this.adultsData.splice(this.customer_info.adults)
    }
    for(let j=0;j<this.customer_info.children;j++){
      this.form[this.childrenData[j].label]=new FormControl("");
    }
    this.childrenData.splice(this.customer_info.children);
    this.customerInfo=new FormGroup(this.form);
    
  }

  confirmBooking(){
    this.flag1=2;
    this.customer = this.customerInfo.value;
    console.log(this.customer)
      
    this.customerInfo.reset();
  }

  public downloadTicket(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 90;
      let fileHeight = 300;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(this.pnrNumber);
    });
      
  }

  viewTicket(){
    this.flag1=3;
    this.bookingFlag=true;  

  }
}
