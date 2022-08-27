import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {


  constructor(public postService: PostsService ,
     private authService: AuthService) { // protection

  }

  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading= false;
  totalPosts = 0;
  postsPerPage= 3;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10]

  private authStatus: Subscription; // protection
  userIsAuthenticated = false;


  ngOnInit(): void {
    this.isLoading= true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postService.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
    this.userIsAuthenticated = this.authService.getISAuth();
    this.authStatus
     =this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
     });
    // protection
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.authStatus.unsubscribe(); // protection
  }

  onDelete(postId: string) { //pagination
    this.isLoading= true;
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    });
  }


  onChangedPage(pageData: PageEvent)
  {
    this.isLoading= true;  //paginator
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

}
