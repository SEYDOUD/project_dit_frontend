import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCustomerComponent } from './admin/admin-customer/admin-customer.component';
import { AdminCommentsComponent } from './admin/admin-comments/admin-comments.component';
import { AppComponent } from './app.component';
import { AdminPostsComponent } from './admin/admin-posts/admin-posts.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AuthComponent } from './customer/auth/auth.component';

const routes: Routes = [
  { path: 'admin/dashboard', component: AdminComponent },
  { path: 'admin/comments', component: AdminCommentsComponent },
  { path: 'admin/customers', component: AdminCustomerComponent },
  { path: 'admin/posts', component: AdminPostsComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'login', component: AuthComponent },
  { path: '', component: CustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
