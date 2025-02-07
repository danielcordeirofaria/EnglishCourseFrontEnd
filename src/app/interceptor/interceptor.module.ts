import { NgModule } from '@angular/core';
import { GuardInterceptor } from './guardInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({

  providers: [GuardInterceptor, {
    provide: HTTP_INTERCEPTORS, 
    useClass: GuardInterceptor, 
    multi: true
  }]

})
export class InterceptorModule { }
