import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public authService: AuthService,public router: Router) { }

  ngOnInit(): void {
  }

  getRole () { 
    return sessionStorage.role
  }

  openProfile () { 
    this.router.navigate(['profile']);
  }

  logOut()
   {
     this.authService.logout();
     this.router.navigate(['']);
   }

}
