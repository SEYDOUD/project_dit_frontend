import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../../shared/User';
import { CustomerAdminService } from '../services/customer-admin.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrl: './admin-customer.component.css'
})
export class AdminCustomerComponent {
  users:User[] = [];
  isBrowser: boolean;
  isLoggedIn = false;

  constructor(
    private _storageService:LocalStorageService,
    private _customerAdminService: CustomerAdminService,
    @Inject(PLATFORM_ID) private platformId: object
  ){
    this.isBrowser = isPlatformBrowser(this.platformId);
  }


  logout(){
    this._storageService.logoutAdmin()
  }

  ngOnInit(): void {
    this.getUsers(); 
    if (this.isBrowser) {
      this.isLoggedIn = this._storageService.isLoggedIn();
    }
  }

  getUsers(){

    this._customerAdminService.getUsers().subscribe(
      
      (datas:User[])=>{
        this.users = datas;
      },
      (err : any) => {
        alert("error"+err.error.callback)
      }
    );
  }

  deleteUser(userId:string){

    this._customerAdminService.deleteUser(userId).subscribe(
      
      ()=>{
        alert("Utilisateur supprimé qvec succèss")
      },
      (err : any) => {
        alert("error"+err.error.callback)
      }
    );
  }
}
