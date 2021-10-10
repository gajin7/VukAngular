import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(){this.userService.getUserInfo(sessionStorage.email).subscribe((data) => {console.log('ovo ' , data)})}

}
