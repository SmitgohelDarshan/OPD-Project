const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  
  PatientID: { type: Number, required: true, ref: 'Patient' },
  DoctorID:{type:Number, required:true, ref:'Doctor'}, 
  AppointmentDate: { type: Date, required: true },
  Status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'], 
    default: 'Pending' 
  },
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

module.exports = mongoose.model('Appointment', AppointmentSchema);