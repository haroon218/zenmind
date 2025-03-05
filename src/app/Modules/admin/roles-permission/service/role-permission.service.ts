import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environments.dev';
import { AddRole, GetAllRolesResponse, RolesResponse, UpdateRole } from '../roles/roles.component';
import { Addpermission, GetAllPermissionsResponse, PermissionsResponse, Updatepermission } from '../permissions/permissions.component';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {
 private http = inject(HttpClient);
  public getRole(): Observable<GetAllRolesResponse> {
    return this.http.get<GetAllRolesResponse>(`${environment.apiUrl}/admin/role/get-all`)
  }
  public addRole(payLoad: AddRole): Observable<RolesResponse> {
    return this.http.post<RolesResponse>(`${environment.apiUrl}/admin/role/add-edit`, payLoad)
  }
  public deleterole(role_id: string): Observable<RolesResponse> {
    return this.http.delete<RolesResponse>(`${environment.apiUrl}/admin/role/${role_id}`)
  }
  public updateRole( data: UpdateRole): Observable<RolesResponse> {
    return this.http.post<RolesResponse>(`${environment.apiUrl}/admin/role/add-edit`, data);
  } 
  public getPermissions(): Observable<GetAllPermissionsResponse> {
    return this.http.get<GetAllPermissionsResponse>(`${environment.apiUrl}/admin/permissions`)
  }
  public addPermission(payLoad: Addpermission): Observable<PermissionsResponse> {
    return this.http.post<PermissionsResponse>(`${environment.apiUrl}/admin/permission`, payLoad)
  }
  public deletePermission(permission_id: string): Observable<PermissionsResponse> {
    return this.http.delete<PermissionsResponse>(`${environment.apiUrl}/admin/permission/${permission_id}`)
  }
  public updatPermission(permission_id: any, data: Updatepermission): Observable<PermissionsResponse> {
    return this.http.post<PermissionsResponse>(`${environment.apiUrl}/admin/permission/${permission_id}`, data);
  }
}
