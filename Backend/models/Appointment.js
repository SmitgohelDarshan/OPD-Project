const mongoose=require('mongoose')

const AppointmentSchema = new mongoose.Schema({
  PatientID: { type: Number, required:true, ref:'Patient' },
  DoctorID: { type: Number, required: true, ref:'Doctor' },
  UserEmail: { type: String },
  AppointmentTime: { type: Date, required: true},
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });


module.exports=mongoose.model('Appointment',AppointmentSchema)