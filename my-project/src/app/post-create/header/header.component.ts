import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs : Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getISAuth(); // last
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

  onLogout() { // 108
    this.authService.logout();
  }

}
