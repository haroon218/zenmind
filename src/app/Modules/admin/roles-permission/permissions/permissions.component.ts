import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { RolePermissionService } from '../service/role-permission.service';
import { TrigerToastService } from '../../Shared/services/triger-toast.service';
@Component({
  selector: 'app-permissions',
  imports: [
    ToolbarModule,
    ButtonModule,
    CommonModule,
    TableModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    DialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent {
  private permissionService = inject(RolePermissionService);
  private toastrService = inject(TrigerToastService);
  permissionsData: any = [];
  loading: boolean = false;
  addPermissionDialog: boolean = false;
  deleteDialog: boolean = false;
  is_update: boolean = false;
  updateItemData: any;
  deleteItem: any;
  // Form for the add permission dialog
  addPermissionForm = new FormGroup({
    name: new FormControl("", [Validators.required])
  })
  ngOnInit() {
  // we will get first the permissions data when component initialize
    this.getPermissions();
  }
  getPermissions() {
    this.loading = true;
    this.permissionService.getPermissions().subscribe({
      next: (respose: GetAllPermissionsResponse) => {
        if (respose && respose.Success) {
       // Assign the response from API to the permissionData array
          this.permissionsData = respose.Data;
          this.loading = false;
        } else {
       // if the Success is false, we will stop the loader
          this.loading = false;
        }
      },
      complete:()=>{
        this.loading = false;
      },
      error: (error: any) => {
      // if there is an error, we will stop the loader
        this.loading = false;
      }
    })
  }
  addPermission() {
 // first check if the form is valid
    if (this.addPermissionForm.valid) {
      this.loading = true;
      this.permissionService.addPermission(this.addPermissionForm.value as Addpermission).subscribe({
        next: (respose: PermissionsResponse) => {
          if (respose && respose.Success) {
   // if the response is true, we will show a success message and close the dialog
            this.loading = true;
            this.toastrService.showToast({
              type: 'success',
              shortMessage: 'Success!',
              detail: respose.Message,
            });
            this.addPermissionDialog = false;
       // after the response from API, we will get the permissions again to ensure the latest data
            this.getPermissions();
          } else {
            this.loading = false;
       // if the Success is false, we will show an error message
            this.toastrService.showToast({
              type: 'error',
              shortMessage: 'Error!',
              detail: respose.Message,
            });
          }
        },
        complete:()=>{
          this.loading = false;
        },
        error: (error: any) => {
          this.loading = false;
        }
      })
    } else {
    // if the form is not valid, we will show the validation error in html 
      this.addPermissionForm.markAllAsTouched();
      this.addPermissionForm.updateValueAndValidity();
    }
  }
  updatePermission() {
    // first check if the form is valid
    if (this.addPermissionForm.valid) {
      this.loading = true;
      this.permissionService.updatPermission(this.updateItemData.id, this.addPermissionForm.value as Updatepermission).subscribe({
        next: (respose: any) => {
          if (respose && respose.Success) {
       // if the Success is true, we will show a success message and close the dialog
            this.loading = false;
            this.is_update = false;
            this.toastrService.showToast({
              type: 'success',
              shortMessage: 'Success!',
              detail: respose.Message,
            });
            this.addPermissionDialog = false;
       // after the response from API, we will get the Permissions again to ensure the latest data after the update      
            this.getPermissions();
          } else {
       // if the Success is false, we will show an error message 
            this.loading = false;
            this.toastrService.showToast({
              type: 'success',
              shortMessage: 'Success!',
              detail: respose.Message,
            });
          }
        },
        complete:()=>{
         this.loading=false;
        },
        error: (error: any) => {
          this.loading = false;
        }
      })
    } else {
    // if the form is not valid, we will show the validation error in html
      this.addPermissionForm.markAllAsTouched();
      this.addPermissionForm.updateValueAndValidity();
    }
  }
  deletePermission() {
    this.loading = true;
    this.permissionService.deletePermission(this.deleteItem.id).subscribe({
      next: (respose: any) => {
        if (respose && respose.Success) {
       // if the Success is true, we will show a success message and close the dialog
          this.loading = false;
          this.deleteDialog = false;
          this.toastrService.showToast({
            type: 'success',
            shortMessage: 'Success!',
            detail: respose.Message,
          });
       // after the response from API, we will get the Permissions again to ensure the latest data after the update
          this.getPermissions();
        } else {
       // if the Success is false, we will show an error message
          this.loading = false;
          this.toastrService.showToast({
            type: 'success',
            shortMessage: 'Success!',
            detail: respose.Message,
          });
        }
      },
      complete:()=>{
        this.loading = false;
      },
      error: (error: any) => {
        this.loading = false;
      }
    })
  }
  openNewPermissionDialog() {
    this.is_update = false;
    this.updateItemData = null;
    this.addPermissionForm.reset() 
    this.addPermissionDialog = true; 
  }
  editPermissionDialog(data: any) {
    this.updateItemData = data;
    this.is_update = true
    this.addPermissionForm.patchValue(data)
    this.addPermissionDialog = true
  }
  deletePermissionDialog(data: any) {
    this.deleteItem = data;
  }
  closeDialog() {
    this.is_update = false;
    this.addPermissionDialog = false;
  }
}
export interface Permissions {
  id: string;
  name:string;
}
export interface Addpermission {
  name:string;
}
export interface Updatepermission {
  name:string;
}
export interface PermissionsResponse {
  Success: boolean;
  Status:number;
  Message: string; 
  Data:{
    id:string;
    name:string;
  }
}
export interface GetAllPermissionsResponse {
  Success: boolean;
  Status:number;
  Message: string; 
  Data:Permissions[]  
}
