import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pj-obl-ang';
  baseUrl = "http://localhost:3000/api/";
  tos: any = [];
  objs: any = [];
  modifyForm = false;
  @ViewChild('modF', {static: false})
  modF: NgForm
  @ViewChild('modObjF', {static: false})
  modObjF: NgForm
  abmObjetos = false;
  selectedType: string;
  
  constructor(private httpClient: HttpClient) {
    this.refreshTOS();
    this.refreshOBJS();
  }

  deleteOBJ(obj) {
    this.httpClient.delete(this.baseUrl + 'objetos' + '/' + obj._id).subscribe((res)=>{
      console.log(res);
      this.refreshOBJS();
    });
  }

  refreshOBJS() {
    this.httpClient.get(this.baseUrl + 'objetos').subscribe((res)=>{
      console.log(res);
      this.objs = res;
    });
  }

  modifyOBJ(obj): void {
    this.modifyForm = true;
    this.modObjF.controls['_id'].setValue(obj._id);
    this.modObjF.controls['state'].setValue(obj.state);
    this.modObjF.controls['orderNumber'].setValue(obj.orderNumber);
    this.selectedType = obj.type._id;
    this.modObjF.controls['description'].setValue(obj.description);
    this.modObjF.controls['basePrice'].setValue(obj.basePrice);
  }

  ngOnInit(): void {
    
  }

  modeObjetos(): void {
    this.abmObjetos = true;
  }

  modeTOS(): void {
    this.abmObjetos = false;
  }

  refreshTOS() {
    this.httpClient.get(this.baseUrl + 'objetotipos').subscribe((res)=>{
      console.log(res);
      this.tos = res;
    });
  }

  deleteTO(to) {
    this.httpClient.delete(this.baseUrl + 'objetotipos' + '/' + to._id).subscribe((res)=>{
      console.log(res);
      this.refreshTOS();
    });
  }

  modifyTO(to) {
    this.modifyForm = true;
    this.modF.controls['code'].setValue(to.code);
    this.modF.controls['name'].setValue(to.name);
    this.modF.controls['_id'].setValue(to._id);
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const { value: body } = form;
    this.httpClient
      .post(this.baseUrl + 'objetotipos', body)
      .subscribe(res => {
        console.log(res);
        this.refreshTOS();
      });
  }
  


  onObjectSubmit(form: NgForm) {
    console.log(form.value);
    var body = {
      state: "",
      orderNumber: "",
      type: "",
      description: "",
      basePrice: ""
    };
    body.state = form.controls['state'].value;
    body.orderNumber = form.controls['orderNumber'].value;
    body.type = this.selectedType;
    body.description = form.controls['description'].value;
    body.basePrice = form.controls['basePrice'].value;

    this.httpClient
      .post(this.baseUrl + 'objetos', body)
      .subscribe(res => {
        console.log(res);
        this.refreshOBJS();
      });
  }

  onModifySubmit(form: NgForm) {
    console.log(form.value);
    var body = {
      name: "",
      code: "",
      _id: ""
    };
    body.name = form.controls['name'].value;
    body.code = form.controls['code'].value;
    body._id = form.controls['_id'].value;
    this.httpClient
      .put(this.baseUrl + 'objetotipos' + '/' + body._id, body)
      .subscribe(res => {
        console.log(res);
        this.refreshTOS();
      });
  }

  onModifySubmitOBJ(form: NgForm) {
    console.log(form.value);
    var body = {
      _id: "", 
      state: "",
      orderNumber: "",
      type: "",
      description: "",
      basePrice: ""
    };
    body._id = form.controls['_id'].value;
    body.state = form.controls['state'].value;
    body.orderNumber = form.controls['orderNumber'].value;
    body.type = this.selectedType;
    body.description = form.controls['description'].value;
    body.basePrice = form.controls['basePrice'].value;
    this.httpClient
      .put(this.baseUrl + 'objetos' + '/' + body._id, body)
      .subscribe(res => {
        console.log(res);
        this.refreshOBJS();
      });
  }


  backToCreate() {
    this.modifyForm = false;
  }
}
