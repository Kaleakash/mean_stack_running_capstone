export class Transaction {
    constructor(
        public id?:number,
        public cid?:number,     //
        public cname?:string,
        public emailid?:string, //
        public accno?:number,   //
        public amount?:number,
        public typeoftransaction?:string,
        public dot?:string,
        public transferTo?:number){}
}
