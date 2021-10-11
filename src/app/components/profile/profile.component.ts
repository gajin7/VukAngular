import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/profile';
import { UserInfo } from 'src/app/models/response/userInfo';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    type: ['', Validators.required],
    lastAppointment: [''],
    nextAppointment: ['']
  });

  passwordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['',Validators.required]
  })

  dateForm = this.fb.group({
    date: ['', Validators.required]
  })
  step = 0;
  hideOld = true;
  hideNew = true;
  datePipe = new DatePipe('en-US');


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  constructor(private userService : UserService, private fb : FormBuilder) { }

  ngOnInit(): void {

    this.mockProfile();
    //this.getUserInfo();
  }

  mockProfile()
  {
    
    this.profileForm.setValue({firstName: 'Jovan', lastName: 'Gajin', email: 'gajinjovan@gmail.com', type: this.getTypeById(3),lastAppointment: this.datePipe.transform(new Date(), 'dd:MM:yyyy'), 
    nextAppointment: this.datePipe.transform(new Date(), 'dd:MM:yyyy')})
  
  }

  getUserInfo(){this.userService.getUserInfo(sessionStorage.email).subscribe((data) => {
    var profile = data as UserInfo;
    this.profileForm.setValue({firstName: profile.FirstName, lastName: profile.LastName, email: profile.Email, type: profile.Type, 
    lastAppointment: this.datePipe.transform(profile.LastAppointment, 'dd:MM:yyyy'), 
    nextAppointment: this.datePipe.transform(profile.SuggestedAppointment, 'dd:MM:yyyy')})

  });
}

changePassword()
{
  window.alert(this.passwordForm.value.oldPassword + ' ' + this.passwordForm.value.newPassword);
}
changePersonalData()
{
  window.alert(this.profileForm.value.firstName + ' ' + this.profileForm.value.lastName + ' ' + this.profileForm.value.email);
}

changeDate()
{
  window.alert(this.dateForm.value.date);
}

getTypeById(id : number) : string
{
  if(id == 3)
  {
    return 'patient'
  }
  else
  {
    return 'unknown'
  }
}

}




