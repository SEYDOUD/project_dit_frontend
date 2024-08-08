import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Comment } from '../../../shared/Comment';
import { isPlatformBrowser } from '@angular/common';
import { CommentAdminService } from '../services/comment-admin.service';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrl: './admin-comments.component.css'
})
export class AdminCommentsComponent {
  comments:Comment[] = [];
  isBrowser: boolean;
  isLoggedIn = false;

  constructor(
    private _storageService:LocalStorageService,
    private _commentAdminService: CommentAdminService,
    @Inject(PLATFORM_ID) private platformId: object
  ){
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  logout(){
    this._storageService.logoutAdmin()
  }

  ngOnInit(): void {
    this.getComment(); 
    if (this.isBrowser) {
      this.isLoggedIn = this._storageService.isLoggedIn();
    }
  }

  getComment(){

    this._commentAdminService.getComments().subscribe(
      
      (datas:Comment[])=>{
        this.comments = datas;
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
