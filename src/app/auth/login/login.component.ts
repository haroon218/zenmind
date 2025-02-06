import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { Subscription } from 'rxjs';
import { SharedService } from '../../Shared/services/shared.service';
import { TrigerToastService } from '../../Shared/services/triger-toast.service';
import { ApiResponce } from '../../Shared/interface/Response.interface';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, RouterModule, RippleModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loading: boolean = false;
  subscribe!: Subscription;

  constructor(private shared: SharedService,private router:Router,private TrigerToast:TrigerToastService) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required]),
    remember: new FormControl(false)
  });

  ngOnInit(): void {}

  getFormData(form: any) {
    if (form?.valid) {
      this.userLogin(form);
    } else {
      this.loginForm.markAllAsTouched();
      this.loginForm.updateValueAndValidity();
    }
  }

  userLogin(formData: FormGroup) {
    this.loading = true;
    let payload = { email: formData.value.email,  password: formData.value.pass };
    this.subscribe = this.shared.sendPostRequest('admin/login', payload).subscribe({
      next: (res: ApiResponce) => {
        this.loading = false;
        if (res?.Success) {
          this.router.navigate(['/']);
          this.shared.insertData({ key: 'user', val: res.Data });
          this.TrigerToast.showToast({ type: 'success', shortMessage: 'Success!',
          detail: res?.Message ? res?.Message : 'Login Successfully!' });
        } else {
          this.TrigerToast.showToast({type: 'error', shortMessage: 'Error!',
          detail: res?.Message ? res?.Message : 'Something Went Wrong!' });
        }
      },
      error: (error) => {
        this.loading = false;
        this.TrigerToast.showToast({type: 'error',shortMessage: 'Error!',detail:'Failed to connect. Please try again'});
      }
    });
  }
  
  ngOnDestroy(): void {
    if(this.subscribe){
      this.subscribe.unsubscribe();
    }
  }
}
