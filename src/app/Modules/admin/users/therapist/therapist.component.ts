import { Component, inject, signal, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CommonModule, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterModule } from '@angular/router';
import { UserService } from '../service/user.service';
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}
@Component({
  selector: 'app-therapist',
  imports: [
    RouterModule,
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    CheckboxModule
  ], templateUrl: './therapist.component.html',
  styleUrl: './therapist.component.scss'
})
export class TherapistComponent {
  private userService = inject(UserService)
  therapistsData:any=[ {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Ali',
    description: 'Ali is Admin',
    role: 'Admin',
    price: 65,
    email: 'test@gmail.com',
    quantity: 24,
    inventoryStatus: 'Rejected',
    rating: 5
},
{
  id: '1000',
  code: 'f230fh0g3',
  name: 'Ali',
  description: 'Ali is Admin',
  role: 'Admin',
  price: 65,
  email: 'test@gmail.com',
  quantity: 24,
  inventoryStatus: 'Rejected',
  rating: 5
},{
  id: '1000',
  code: 'f230fh0g3',
  name: 'Ali',
  description: 'Ali is Admin',
  role: 'Admin',
  price: 65,
  email: 'test@gmail.com',
  quantity: 24,
  inventoryStatus: 'Accepted',
  rating: 5
},{
  id: '1000',
  code: 'f230fh0g3',
  name: 'Ali',
  description: 'Ali is Admin',
  role: 'Admin',
  price: 65,
  email: 'test@gmail.com',
  quantity: 24,
  inventoryStatus: 'Rejected',
  rating: 5
},{
  id: '1000',
  code: 'f230fh0g3',
  name: 'Ali',
  description: 'Ali is Admin',
  role: 'Admin',
  price: 65,
  email: 'test@gmail.com',
  quantity: 24,
  inventoryStatus: 'Accepted',
  rating: 5
},{
  id: '1000',
  code: 'f230fh0g3',
  name: 'Ali',
  description: 'Ali is Admin',
  role: 'Admin',
  price: 65,
  email: 'test@gmail.com',
  quantity: 24,
  inventoryStatus: 'Accepted',
  rating: 5
},{
  id: '1000',
  code: 'f230fh0g3',
  name: 'Ali',
  description: 'Ali is Admin',
  role: 'Admin',
  price: 65,
  email: 'test@gmail.com',
  quantity: 24,
  inventoryStatus: 'Accepted',
  rating: 5
},{
  id: '1000',
  code: 'f230fh0g3',
  name: 'Ali',
  description: 'Ali is Admin',
  role: 'Admin',
  price: 65,
  email: 'test@gmail.com',
  quantity: 24,
  inventoryStatus: 'Rejected',
  rating: 5
},{
  id: '1000',
  code: 'f230fh0g3',
  name: 'Ali',
  description: 'Ali is Admin',
  role: 'Admin',
  price: 65,
  email: 'test@gmail.com',
  quantity: 24,
  inventoryStatus: 'Rejected',
  rating: 5
},{
  id: '1000',
  code: 'f230fh0g3',
  name: 'Ali',
  description: 'Ali is Admin',
  role: 'Admin',
  price: 65,
  email: 'test@gmail.com',
  quantity: 24,
  inventoryStatus: 'Accepted',
  rating: 5
},{
  id: '1000',
  code: 'f230fh0g3',
  name: 'Ali',
  description: 'Ali is Admin',
  role: 'Admin',
  price: 65,
  email: 'test@gmail.com',
  quantity: 24,
  inventoryStatus: 'Rejected',
  rating: 5
},{
  id: '1000',
  code: 'f230fh0g3',
  name: 'Ali',
  description: 'Ali is Admin',
  role: 'Admin',
  price: 65,
  email: 'test@gmail.com',
  quantity: 24,
  inventoryStatus: 'Accepted',
  rating: 5
},{
  id: '1000',
  code: 'f230fh0g3',
  name: 'Ali',
  description: 'Ali is Admin',
  role: 'Admin',
  price: 65,
  email: 'test@gmail.com',
  quantity: 24,
  inventoryStatus: 'Accepted',
  rating: 5
},{
  id: '1000',
  code: 'f230fh0g3',
  name: 'Ali',
  description: 'Ali is Admin',
  role: 'Admin',
  price: 65,
  email: 'test@gmail.com',
  quantity: 24,
  inventoryStatus: 'Accepted',
  rating: 5
}];
  productDialog: boolean = false;
  products = signal<any[]>([]);
  product!: any;
  selectedProducts!: any[] | null;
  submitted: boolean = false;
  statuses!: any[];
  pizza: any
  @ViewChild('dt') dt!: Table;
  exportColumns!: ExportColumn[];
  cols!: Column[];
  dataAry: any = [];
  constructor() { 
    // this.getTherapistsData()
  }
  ngOnInit() {
  }
  getTherapistsData(){
    this.userService.getTherapists().subscribe({
      next:(respose:any)=>{
        if(respose&&respose.Success){
          this.therapistsData=respose.Data
        }else{

        }
      },
      error:(error:any)=>{

      }
    })
  }
  getSeverity(status: string) {
    switch (status) {
        case 'Accepted':
            return 'success';
        case 'LOWSTOCK':
            return 'warn';
        case 'Rejected':
            return 'danger';
        default:
            return 'info';
    }
}
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: any) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteSelectedProducts() {   
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  deleteProduct(product: any) {
    
  }


  saveProduct() {
   
  }
}


