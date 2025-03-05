import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { RolePermissionService } from '../service/role-permission.service';
import { TrigerToastService } from '../../Shared/services/triger-toast.service';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-roles',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    InputIconModule,
    InputTextModule,
    RippleModule,
    IconFieldModule,
  ], templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent {
  private rolesService = inject(RolePermissionService);
  private toastrService = inject(TrigerToastService)
  RolesData: Role[] = [];
  loading: boolean = true;
  addRoleDialog: boolean = false;
  deleteRoleDialogShow: boolean = false;
  is_update: boolean = false;
  updateRoleData: any = {}
  deleteItem: any = {}
  // Form for the add role dialog
  addRoleForm = new FormGroup({
    name: new FormControl("", [Validators.required])
  })
  ngOnInit(): void {
    // we will get first the roles when component initialize
    this.getAllRoles()
  }
  getAllRoles() {
    this.loading = true;
    this.rolesService.getRole().subscribe({
      next: (response: GetAllRolesResponse) => {
        if (response && response.Success) {
          // Assign the response from API to the RolesData array
          this.RolesData = response.Data;
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
  addRole() {
    // first check if the form is valid
    if (this.addRoleForm.valid) {
      this.loading = true;
      this.rolesService.addRole(this.addRoleForm.value as AddRole).subscribe({
        next: (response: RolesResponse) => {
          debugger
          if (response && response.Success) {
            // if the response is true, we will show a success message and close the dialog
            this.loading = false;
            this.addRoleDialog = false;
            this.toastrService.showToast({
              type: 'success',
              shortMessage: 'Success!',
              detail: response.Message,
            });
            // after the response from API, we will get the roles again to ensure the latest data
            this.getAllRoles();
          } else {
            this.loading = false;
            // if the Success is false, we will show an error message
            this.toastrService.showToast({
              type: 'error',
              shortMessage: 'Error!',
              detail: response.Message,
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
      this.addRoleForm.markAllAsTouched();
      this.addRoleForm.updateValueAndValidity();
    }
  }

  updateRole() {
    // first check if the form is valid
    if (this.addRoleForm.valid) {
      let payload = {
        name: this.addRoleForm.value.name as string,
        role_id: this.updateRoleData.id
      }
      this.loading=true;
      this.rolesService.updateRole(payload).subscribe({
        next: (response: RolesResponse) => {
          if (response && response.Success) {
            // if the Success is true, we will show a success message and close the dialog
            this.loading=true;
            this.addRoleDialog = false;
            this.toastrService.showToast({
              type: 'success',
              shortMessage: 'Success!',
              detail: response.Message,
            });
            // after the response from API, we will get the roles again to ensure the latest data after the update
            this.getAllRoles();

          } else {
            // if the Success is false, we will show an error message
            this.toastrService.showToast({
              type: 'success',
              shortMessage: 'Success!',
              detail: response.Message,
            });
            this.loading = false;
          }
        },
        complete:()=>{
          this.loading = false;
        },
        error: (error: any) => {
        this.loading=false;
        }
      })
    } else {
      // if the form is not valid, we will show the validation error in html
      this.addRoleForm.markAllAsTouched();
      this.addRoleForm.updateValueAndValidity();
    }
  }
  deleteRole() {
    this.loading=true;
    this.rolesService.deleterole(this.deleteItem.id).subscribe({
      next: (respose: RolesResponse) => {
        if (respose && respose.Success) {
          this.loading=false;
        // if the Success is true, we will show a success message and close the dialog
          this.deleteRoleDialogShow = false;
          this.toastrService.showToast({
            type: 'success',
            shortMessage: 'Success!',
            detail: respose.Message,
          });
         // after the response from API, we will get the roles again to ensure the latest data after the update
          this.getAllRoles();
        } else {
           // if the Success is false, we will show an error message
          this.loading=false;
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
       this.loading=false;
      }
    })
  }
  openCreateDialog() {
    this.is_update = false;
    this.updateRoleData = null;
    this.addRoleDialog = true;
    this.addRoleForm.reset();
  }
  editRoleDialog(data: any) {
    this.updateRoleData = data;
    this.is_update = true
    this.addRoleForm.patchValue(data);
    this.addRoleDialog = true
  }
  deleteRoleDialogData(data: any) {
    this.deleteItem = data;
  }
  closeDialog() {
    this.is_update = false;
    this.addRoleDialog = false;
  }
}
export interface Role {
  id: string;
  name:string;
}
export interface AddRole {
  name:string;
}
export interface UpdateRole {
  name:string;
  role_id:string;
}
export interface RolesResponse {
  Success: boolean;
  Status:number;
  Message: string; 
  Data:{
    id:string;
    name:string;
  }
}
export interface GetAllRolesResponse {
  Success: boolean;
  Status:number;
  Message: string; 
  Data:Role[]  
}