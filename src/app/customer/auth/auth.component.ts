import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserLog } from '../../../shared/UserLog';
import { User } from '../../../shared/User';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  constructor(
    private _authService: AuthService,
    private router: Router,
    private _storageService:LocalStorageService
  ){}


  contactForm = new FormGroup({
    senderUsername:new FormControl('',Validators.required),
    senderPassword: new FormControl('',Validators.required)
  })

  registerForm = new FormGroup({
    senderPrenom:new FormControl('',Validators.required),
    senderNom: new FormControl('',Validators.required),
    senderUsername: new FormControl('',Validators.required),
    senderEmail: new FormControl('',Validators.required),
    senderPassword: new FormControl('',Validators.required),
  })

  // ngOnInit(): void {
  //   this.isLoggedIn = this._storageService.isLoggedIn();
  // }
  

  login() {
    // console.log("jesuis la pourtant")
    if (this.contactForm.valid) {
      const credentials: any = {
        username: this.contactForm.controls.senderUsername.value ?? '',
        password: this.contactForm.controls.senderPassword.value ?? ''
      };

      this._authService.loginCustomer(credentials).subscribe(
        (data: any) => {
          // console.log("myToken: ",data.token)
          this._storageService.loginUser(data.token);
          // this.isLoggedIn = true;
          this.router.navigate(['/']);
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

  register() {
    alert("jesuis la pourtant")
    if (this.registerForm.valid) {
      const credentials: User = {
        id:"",
        prenom: this.registerForm.controls.senderPrenom.value ?? '',
        nom: this.registerForm.controls.senderNom.value ?? '',
        username: this.registerForm.controls.senderUsername.value ?? '',
        email: this.registerForm.controls.senderEmail.value ?? '',
        password: this.registerForm.controls.senderPassword.value ?? '',
      };

      this._authService.registerCustomer(credentials).subscribe(
        (data: any) => {
          this._storageService.loginUser(data.token);
          this.router.navigate(['/']);
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

  // logout() {
  //   this._storageService.logoutUser();
  //   this.isLoggedIn = false;
  // }

  
}
