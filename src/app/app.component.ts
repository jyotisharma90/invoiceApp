import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  taxpercentage: any;
  tax: any;
  submitted:boolean =false;
  result: any;
  subtotal: any;
  total: number;
  title = 'app';
  
  invoiceForm:FormGroup;
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
 
  constructor(private fb:FormBuilder){

  }
  ngOnInit(){
    this.tax = 5;
    this.result = '$ 0';
    this.taxpercentage=5;
    this.invoiceForm = this.fb.group({
      'invoiceno':['',Validators.required],
      'fromTo':['',Validators.required],
      'date':['',Validators.required],
      'dueDate':['',Validators.required],
      'billTo':['',Validators.required],

      'tax':[''],
      'amountPaid':[''],
      'notes':[''],
      'terms':['']
    })
  }
  

    addFieldValue() {
     
        this.fieldArray.push(this.newAttribute)
        this.newAttribute = {};
    }

    deleteFieldValue(index) {
        this.fieldArray.splice(index, 1);
        if(this.fieldArray.length>0){
          console.log(this.fieldArray)
          this.subtotal=0;
          this.fieldArray.forEach((value) => {
            this.subtotal = this.subtotal + value.total;
            console.log(this.subtotal)
            this.caltax(this.taxpercentage);
          });
        }
    }
    changevalue(data){
      if(data.quantity && data.rate){
        data.total = data.quantity * data.rate;
        if(this.fieldArray.length>0){
          console.log(this.fieldArray)
          this.subtotal=0;
          this.fieldArray.forEach((value) => {
            this.subtotal = this.subtotal + value.total;
            console.log(this.subtotal)
            this.caltax(this.taxpercentage);
          });
        }
      }
      else{
        data.total = 0;
      }
    }
    caltax(val){
      this.taxpercentage = val;
      if(this.subtotal)
      {
        var num =   this.subtotal + (val/100)* this.subtotal;
        this.result = '$' + num.toFixed(2);
      }
      else{
        this.result = '$ 0';
        alert('please add item')
      }
    }
    onSubmit(){
      this.submitted = true;
      if (this.invoiceForm.invalid) {
        return;
      }
      window.print();
      
    }
    get f() { return this.invoiceForm.controls; }
}
