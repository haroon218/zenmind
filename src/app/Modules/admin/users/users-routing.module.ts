import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { TherapistComponent } from './therapist/therapist.component';
import { TherapistDetailComponent } from './therapist-detail/therapist-detail.component';

const routes: Routes = [
  {path:'patient',component:PatientComponent},
  {path:'therapist',component:TherapistComponent},
  {path:'detail/:id',component:TherapistDetailComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
