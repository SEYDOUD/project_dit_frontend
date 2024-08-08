import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthAdminService } from '../services/auth-admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  constructor(
    private _authAdminService: AuthAdminService,
    private router: Router,
    private _storageService:LocalStorageService
  ){}

  contactForm = new FormGroup({
    senderUsername:new FormControl('',Validators.required),
    senderPassword: new FormControl('',Validators.required)
  })

  login() {
    // console.log("jesuis la pourtant")
    if (this.contactForm.valid) {
      const credentials: any = {
        username: this.contactForm.controls.senderUsername.value ?? '',
        password: this.contactForm.controls.senderPassword.value ?? ''
      };

      this._authAdminService.loginAdmin(credentials).subscribe(
        (data: any) => {
          // alert("data: "+data.token)
          this._storageService.loginUser(data.token);
          this.router.navigate(['/admin/dashboard']);
        },
        (err: any) => {
          console.log(err.error.callback);
          alert("Erreur: " + err.error);
        }
      );
    } else {
      alert('Form is invalid');
    }
  }



}
