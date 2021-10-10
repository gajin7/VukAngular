import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppointmentResponse } from 'src/app/models/response/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointments: Array<AppointmentResponse> = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  constructor(private appointmentService : AppointmentService, private fb : FormBuilder) { }
  
  appointmentDate = this.fb.group({
    
    Date: ['', Validators.required],
    
  });

  ngOnInit(): void {
  }

  getAppointments(){
    var datePipe = new DatePipe('en-US');
    var date = datePipe.transform(this.appointmentDate.value.Date, 'MM-dd-yyyy')
    console.log(date)
    this.appointmentService.getAppointments(date)
      .subscribe((data)=> 
        { 
          this.appointments = data as Array<AppointmentResponse>;
          console.log("zdravo jovo ", this.appointments);
        } 
      )
  }
  
}
