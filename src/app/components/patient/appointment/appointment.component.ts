import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppointmentPersonalResponse } from 'src/app/models/response/appointmentPersonalResponse';
import { AppointmentResponse } from 'src/app/models/response/appointmentResponse';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointments: Array<AppointmentResponse> = [];
  appointmentsPersonal: Array<AppointmentPersonalResponse> = [];
  constructor(private appointmentService : AppointmentService, private fb : FormBuilder) { }
  
  appointmentDate = this.fb.group({
    
    Date: ['', Validators.required],
    
  });

  ngOnInit(): void {
    this.GetPersonalAppointment();
  }

  getAppointments(){
    var datePipe = new DatePipe('en-US');
    var date = datePipe.transform(this.appointmentDate.value.Date, 'MM-dd-yyyy')
    console.log(date)
    this.appointmentService.getAppointments(date)
      .subscribe((data)=> 
        { 
          this.appointments = data as Array<AppointmentResponse>;
          console.log(this.appointments)
        } 
      )
  }

  // getAppointments(){
    
  //   var datePipe = new DatePipe('en-US');
  //   var app1 = new AppointmentResponse();
  //   app1.DateTimeFrom = datePipe.transform(this.appointmentDate.value.Date, 'hh:mm');
  //   app1.DateTimeTo = datePipe.transform(this.appointmentDate.value.Date, 'hh:mm');
  //   app1.DentistName = "Pera";
  //   app1.AppoitmentId = 1;
  //   app1.Reserved = false;

  //   var app2 = new AppointmentResponse();
  //   app2.DateTimeFrom = datePipe.transform(this.appointmentDate.value.Date, 'hh:mm');
  //   app2.DateTimeTo = datePipe.transform(this.appointmentDate.value.Date, 'hh:mm');
  //   app2.DentistName = "Marko";
  //   app2.AppoitmentId = 1;
  //   app2.Reserved = false;

  //   var app3 = new AppointmentResponse();
  //   app3.DateTimeFrom = datePipe.transform(this.appointmentDate.value.Date, 'hh:mm');
  //   app3.DateTimeTo = datePipe.transform(this.appointmentDate.value.Date, 'hh:mm');
  //   app3.DentistName = "Janko";
  //   app3.AppoitmentId = 1;
  //   app3.Reserved = false;

  //   var app4 = new AppointmentResponse();
  //   app4.DateTimeFrom = datePipe.transform(this.appointmentDate.value.Date, 'hh:mm');
  //   app4.DateTimeTo = datePipe.transform(this.appointmentDate.value.Date, 'hh:mm');
  //   app4.DentistName = "Vuk";
  //   app4.AppoitmentId = 1;
  //   app4.Reserved = true;
    

  //   this.appointments.push(app1);
  //   this.appointments.push(app2);
  //   this.appointments.push(app3);
  //   this.appointments.push(app4);
  // }

  BookAppoitment( appointment: AppointmentResponse)
  {
    this.appointmentService.bookAppointment(appointment.Id).subscribe(
      () => 
      {
        window.alert('nesto')
        this.getAppointments()
      }
    )
    //window.alert(appointment.DentistName);
  }

  GetPersonalAppointment(){
    this.appointmentService.getPersonalAppointments()
      .subscribe((data)=> 
        { 
          this.appointmentsPersonal = data as Array<AppointmentPersonalResponse>;
          console.log(data)
        } 
      )
  }  
}
