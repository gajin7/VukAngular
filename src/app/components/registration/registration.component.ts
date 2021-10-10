import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm = this.fb.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Email: ['', Validators.required],
    Password: ['', Validators.required],
    DateOfBirth: ['', Validators.required],
    Type: ['3', Validators.required],
  });

  constructor(private fb: FormBuilder, private userService : UserService)
  {
    
  }
  ngOnInit(): void {
    
  }
  hide = true;

  register(): void{
    console.log("registration",this.registrationForm.value);
    this.userService.register(this.registrationForm.value).subscribe((data) => {
     console.log("response", data);
  
    });
  }

}