import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";


@Injectable({ providedIn: "root"})
export class AuthService {
  private token: string; //login token
  private authStatusListener = new Subject<boolean>();
  private isAuththenticated = false;
  private tokenTimer: any; //111

  constructor(private http: HttpClient,
     private router:Router) {}
    //  109

  getToken() { //login token
    return this.token;
  }

  getISAuth() { //login token
    return this.isAuththenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password:password};
    this.http.post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password:password};
                                 //111
    this.http.post<{token: string, expiresIn: number}>
    ("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {  //111
          const expiresInDuration = response.expiresIn;

          //last
          this.setAuthTimer(expiresInDuration);
          this.isAuththenticated = true;
          this.authStatusListener.next(true); //
          const now = new Date();  // last
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate)
          this.router.navigate(['/']); //109
        }

      });
  }

  autoAuthUser() { // last
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuththenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

// 108
  logout () {
    this.token = null;
    this.isAuththenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer); //111
    this.clearAuthData(); //last
    this.router.navigate(['/']); //109

  }
// last
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }
// last
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData () {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration")
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => { //111
      this.logout();
    }, duration * 1000);
  }
}
