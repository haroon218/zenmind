import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-role',
  imports: [
    ToolbarModule,
    ButtonModule, 
    CommonModule,
    TableModule,
    InputIconModule,  
    IconFieldModule,   
    InputTextModule, 
    DialogModule,
    ReactiveFormsModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent implements OnInit{
  selectedProducts:any;
  addRoleDialog:boolean = false;
  deleteDialog:boolean = false;
  is_update:boolean = false;
  updateItemData:any;
  deleteItem:any;

  dataAry:any = [  
    {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Ali',
        description: 'Ali is Admin',
        role: 'Admin',
        price: 65,
        email: 'test@gmail.com',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        create_at:"Thu Feb 06 2025 22:26:54 GMT+0500"
    },
    {
        id: '1001',
        code: 'nvklal433',
        name: 'User1',
        description: 'User1 is our super...',
        role: 'Super Admin',
        price: 72,
        email: 'test@gmail.com',
        quantity: 61,
        inventoryStatus: 'INSTOCK',
        rating: 4,
        create_at:"Thu Feb 06 2025 22:28:18 GMT+0500"
    },
  ]

  addRoleForm = new FormGroup({
    roleName:new FormControl("",[Validators.required])
  })

  constructor(){}
  ngOnInit(): void {}

  addRole(form:FormGroup){
    console.log(form);
    if (form.valid) {
      console.log(form.value);
      this.addRoleDialog = false;
      this.dataAry.push({
        id: this.dataAry.length + 1,
        role: form?.value?.roleName,
        create_at: new Date()
      })
      this.addRoleForm.reset()
    } else {
      form.markAllAsTouched();
      form.updateValueAndValidity();
    }
  }

  updateRole(form:FormGroup){
    // debugger;
    if (form.valid) {
      let load = {
        id: this.updateItemData?.id,
        role: form?.value?.roleName,
        create_at: new Date()
      }
      this.dataAry.filter( (data:any,ind:any) =>{
        if(data.id == this.updateItemData?.id){
          this.dataAry.splice(ind,1,load);
        }
      }) 
      this.addRoleForm.reset();
      this.addRoleDialog = false;
      this.is_update = false;
      this.updateItemData = null;
    } else {
      form.markAllAsTouched();
      form.updateValueAndValidity();
    }
  }
   
  openNew(){this.addRoleDialog = true ; this.addRoleForm.reset()}
  deleteSelectedProducts(){}
  editProduct(data:any){
    this.updateItemData = data;
    this.is_update = true
    console.log(data);
    this.addRoleForm.get('roleName')?.setValue(data?.role);
    this.addRoleDialog  = true
  }
  deleteProduct(data:any){
    console.log(data);
    this.deleteItem = data;
  }
  saveProduct(){}

  removeRole(){
    this.dataAry = this.dataAry.filter((item:any) => item.id !==  this.deleteItem?.id);
    this.deleteDialog = false;
  }

 
}
