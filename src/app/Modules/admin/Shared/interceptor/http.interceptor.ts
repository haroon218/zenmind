import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { TrigerToastService } from '../services/triger-toast.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(TrigerToastService); // Inject the ToastService
  debugger
  const token: any = JSON.parse(localStorage.getItem('Data@Salvao') || 'null')?.token;
debugger
  // Clone the request and add the Authorization header
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  // Pass the cloned request to the next handler
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle HTTP errors
      let errorMessage = 'An unknown error occurred!';
      if (error.error?.Message) {
        errorMessage = error.error.Message; 
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized: Please log in again.';
      } else if (error.status === 403) {
        errorMessage = 'Forbidden: You do not have permission to access this resource.';
      }  else if (error.status >= 500) {
        errorMessage = 'Server Error: Please try again later.';
      }else if (error.status === 0) {
        // No internet connection or network error
        errorMessage = 'No internet connection. Please check your network.';
      }
      // Show the error in a toast
      toastService.showToast({
        type: 'error',
        shortMessage: 'Error!',
        detail: errorMessage,
      });

      // Re-throw the error to propagate it to the caller
      return throwError(() => error);
    })
  );
};