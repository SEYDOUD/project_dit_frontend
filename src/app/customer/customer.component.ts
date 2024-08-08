import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PostService } from './services/post.service';
import { Post } from '../../shared/Post';
import { LocalStorageService } from '../services/local-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from './services/comment.service';
import { AppreciationService } from './services/appreciation.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{

  posts:Post[] = [];
  fileName = '';
  imageData: string | ArrayBuffer | null = null; // Variable pour stocker les données binaires de l'image
  selectedFile: File | undefined;
  isBrowser: boolean;

  constructor(
    private _postService: PostService,
    private _commentService: CommentService,
    private _appreciationService: AppreciationService,
    private _storageService:LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: object

  ){
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  contactForm = new FormGroup({
    senderPostMessage: new FormControl(''),
    senderPostImg: new FormControl('', [Validators.required]),
  });

  commentForm = new FormGroup({
    senderComment: new FormControl(''),
  });
  
  isLoggedIn = false;

  ngOnInit(): void {
    this.getPosts(); 
    if (this.isBrowser) {
      this.isLoggedIn = this._storageService.isLoggedIn();
    }
  }

  getPosts(){

    this._postService.getPosts().subscribe(
      
      (datas:Post[])=>{
        this.posts = datas;
      },
      (err : any) => {
        alert(err.error.callback)
      }
    );
  }

  logout(){
    this._storageService.logoutUser()
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  addPost(): void {
    // console.log("postData:")
    if (this.contactForm.valid && this.selectedFile) {
      const postData: any = {
        message: this.contactForm.value.senderPostMessage || '',
        img:this.selectedFile.name,
      };

      // console.log("postData:",postData)

      this._postService.addPost(postData).subscribe(
        () => {
          alert("post créé avec succèss")
          this.contactForm.reset();
        },
        (error: any) => {
          alert(error.message);
        }
      );
    } else {
      console.log("c est pas validé apparemment")
    }
  }

  addComment(postId:string): void {
    if (this.commentForm.valid) {
      const postData: any = {
        message: this.commentForm.value.senderComment || '',
      };
      // console.log("postData:",postData)
      this._commentService.addComment(postId,postData).subscribe(
        () => {
          alert("commentaire créé avec succèss")
          this.commentForm.reset();
        },
        (error: any) => {
          alert(error.message);
        }
      );
    } else {
      console.log("c est pas validé apparemment")
    }
  }

  changeAppreciation(postId:string,isAppreciate:boolean): void {
    
      const appreciationData: any = {
        isAppreciate: isAppreciate,
      };

      this._appreciationService.changeAppreciation(postId,appreciationData).subscribe(
        () => {
          alert("Nous avons enregistré votre appreciation avec succès")
        },
        (error: any) => {
          alert(error.message);
        }
      );
   
  }
}
