export class AppointmentModel {
  Id: number | undefined;
  DateTimeFrom: string | null | undefined;
  DateTimeTo: string | null | undefined;
  DentistName: string | undefined;
  PatientName: string | undefined;
  Reserved: boolean | undefined;
  PatientEmail: string | undefined;
}
