import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth-gurds";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { PostCreateComponent } from "./post-create/post-create/post-create.component";

import { PostListComponent } from "./post-create/post-list/post-list.component";


const routes: Routes = [
  {path:'', component: PostListComponent},
  {path:'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  {path:'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard] // 110
})
export class AppRoutingModule {}
