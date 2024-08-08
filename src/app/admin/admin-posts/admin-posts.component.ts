import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { PostAdmin } from '../../../shared/PostAdmin';
import { isPlatformBrowser } from '@angular/common';
import { PostAdminService } from '../services/post-admin.service';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrl: './admin-posts.component.css'
})
export class AdminPostsComponent {
  posts:PostAdmin[] = [];
  isBrowser: boolean;
  isLoggedIn = false;

  constructor(
    private _storageService:LocalStorageService,
    private _postAdminService: PostAdminService,
    @Inject(PLATFORM_ID) private platformId: object
  ){
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  logout(){
    this._storageService.logoutAdmin()
  }

  ngOnInit(): void {
    this.getPosts(); 
    if (this.isBrowser) {
      this.isLoggedIn = this._storageService.isLoggedIn();
    }
  }

  getPosts(){

    this._postAdminService.getPosts().subscribe(
      
      (datas:PostAdmin[])=>{
        this.posts = datas;
      },
      (err : any) => {
        alert("error"+err.error.callback)
      }
    );
  }

  deletePost(postId:string){

    this._postAdminService.deletePost(postId).subscribe(
      
      ()=>{
        alert("Post supprimé avec succèss")
      },
      (err : any) => {
        alert("error"+err.error.callback)
      }
    );
  }
}
