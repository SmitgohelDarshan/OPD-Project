const Doctor=require('../models/Doctor')
const Appointment=require('../models/Appointment')

async function bookNextAvailable() {

    const {doctorId,patientId,userId}=req.body
    const doctor = await Doctor.findOne({ DoctorID: doctorId });
    if (!doctor) throw new Error("Doctor not found");

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    let targetDate = new Date(doctor.AppointmentDate);
    targetDate.setHours(0, 0, 0, 0);

    let slotToAssign;

    // --- STEP 1: DATE RESET LOGIC ---
    // If the tracked AppointmentDate is yesterday or older, start fresh today
    if (targetDate < today) {
        targetDate = today;
        slotToAssign = 0;
        
        // Sync the doctor's record to today
        await Doctor.updateOne(
            { DoctorID: doctorId },
            { $set: { AppointmentDate: today, currentSlot: 1 } }
        );
    } 
    // --- STEP 2: ROLLOVER LOGIC ---
    // If today is full, move to tomorrow
    else if (doctor.currentSlot > doctor.SlotsPerDay) {
        targetDate.setDate(targetDate.getDate() + 1);
        slotToAssign = 0;

        await Doctor.updateOne(
            { DoctorID: doctorId },
            { $set: { AppointmentDate: targetDate, currentSlot: 1 } }
        );
    } 
    // --- STEP 3: STANDARD INCREMENT ---
    else {
        slotToAssign = doctor.currentSlot;
        await Doctor.updateOne(
            { DoctorID: doctorId },
            { $inc: { currentSlot: 1 } }
        );
    }

    // --- STEP 4: CALCULATION ---
    const finalAppointmentTime = new Date(targetDate);
    finalAppointmentTime.setHours(doctor.StartTime.getHours());
    finalAppointmentTime.setMinutes(doctor.StartTime.getMinutes());
    finalAppointmentTime.setSeconds(0);
    finalAppointmentTime.setMilliseconds(0);

    const minutesToAdd = slotToAssign * doctor.AvgTimePerPatient;
    finalAppointmentTime.setMinutes(finalAppointmentTime.getMinutes() + minutesToAdd);

    // --- STEP 5: SAVE ---
    const newAppointment = new Appointment({
        patientId,
        doctorId,
        userId,
        appointmentTime: finalAppointmentTime
    });

    return await newAppointment.save();
}

module.exports={bookNextAvailable}