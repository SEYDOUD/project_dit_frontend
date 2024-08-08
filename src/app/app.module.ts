import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCustomerComponent } from './admin/admin-customer/admin-customer.component';
import { AdminCommentsComponent } from './admin/admin-comments/admin-comments.component';
import { AdminPostsComponent } from './admin/admin-posts/admin-posts.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AuthComponent } from './customer/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    AdminComponent,
    AdminCustomerComponent,
    AdminCommentsComponent,
    AdminPostsComponent,
    AdminLoginComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
