import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { isPlatformBrowser } from '@angular/common';
import { CommentAdminService } from './services/comment-admin.service';
import { Comment } from '../../shared/Comment';
import { User } from '../../shared/User';
import { CustomerAdminService } from './services/customer-admin.service';
import { PostAdminService } from './services/post-admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  comments:Comment[] = [];
  users:User[] = [];
  isBrowser: boolean;
  totalPost = 0
  totalUser = 0
  totalComment = 0

  constructor(
    private _storageService:LocalStorageService,
    private _commentAdminService: CommentAdminService,
    private _customerAdminService: CustomerAdminService,
    private _postAdminService: PostAdminService,
    @Inject(PLATFORM_ID) private platformId: object
  ){
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  logout(){
    this._storageService.logoutAdmin()
  }

  isLoggedIn = false;

  ngOnInit(): void {
    this.getTotalComments();
    this.getTotalPost();
    this.getTotalUsers();
    this.getComments(); 
    this.getUsers(); 
    if (this.isBrowser) {
      this.isLoggedIn = this._storageService.isLoggedIn();
    }
  }

  getComments(){

    this._commentAdminService.getComments().subscribe(
      
      (datas:Comment[])=>{
        this.comments = datas;
      },
      (err : any) => {
        alert("error"+err.error.callback)
      }
    );
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

  getTotalPost(){

    this._postAdminService.getTotalPosts().subscribe(
      
      (data:any)=>{
        this.totalPost = data;
      },
      (err : any) => {
        alert("error"+err.error.callback)
      }
    );
  }

  getTotalUsers(){

    this._customerAdminService.getTotalUsers().subscribe(
      
      (data:any)=>{
        this.totalUser = data;
      },
      (err : any) => {
        alert("error"+err.error.callback)
      }
    );
  }

  getTotalComments(){

    this._commentAdminService.getTotalComment().subscribe(
      
      (data:any)=>{
        this.totalComment = data;
      },
      (err : any) => {
        alert("error"+err.error.callback)
      }
    );
  }

  deleteComments(commentId:string){

    this._commentAdminService.deleteComment(commentId).subscribe(
      
      ()=>{
        alert("Commentaire supprimé qvec succèss")
      },
      (err : any) => {
        alert("error"+err.error.callback)
      }
    );
  }

  
}
