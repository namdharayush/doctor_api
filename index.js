const express = require('express');
const app = express();

const doctors = [
    { id: 1, name: "Dr. Smith", specialty: "Cardiology" },
    { id: 2, name: "Dr. Johnson", specialty: "Dermatology" },
    { id: 3, name: "Dr. Ayush Namdhar", specialty: "Dentist" }
];
const doctorSchedules = {
    1: {
        "Monday": ["10:00", "7:00"],
        "Tuesday": ["10:00", "7:00"],
        "Wednesday": ["10:00", "7:00"],
        "Thrusday": ["10:00", "7:00"],
        "Friday":["10:00", "7:00"],
        "Saturday": ["10:00", "7:00"],
    },
    2: {
        "Monday": ["10:00", "7:00"],
        "Tuesday": ["10:00", "7:00"],
        "Wednesday": ["10:00", "7:00"],
        "Thrusday": ["10:00", "7:00"],
        "Friday":["10:00", "7:00"],
        "Saturday": ["10:00", "7:00"],
    },
    3: {
        "Monday": ["10:00", "7:00"],
        "Tuesday": ["10:00", "7:00"],
        "Wednesday": ["10:00", "7:00"],
        "Thrusday": ["10:00", "7:00"],
        "Friday":["10:00", "7:00"],
        "Saturday": ["10:00", "7:00"],
    }
};

app.get('/api/doctors', (req, resp) => {
    resp.json(doctors);
})

app.get('/api/doctors/:doctor_id', (req, res) => {
    const doctorId = req.params.doctor_id;
    const doctor = doctors.find(d => d.id == doctorId);
    if (!doctor) {
        return res.status(404).json({ error: "Doctor not found" });
    }
    const schedule = doctorSchedules[doctorId];
    res.json({ ...doctor, schedule });
});



app.get('/api/doctors/:doctor_name/:availability', (req, res) => {
    const doctorName = req.params.doctor_name;
    const doctor = doctors.find(val => val.name === doctorName)
    if (!doctor) {   
        return res.status(404).json({ error: "Doctor Name not found" });
    }
    const day = req.params.availability
    let availabelDoctor;
    if(day === 'Sunday'){
        return res.status(404).json({ error: "Doctors are leave on every sunday! " });
    }
    else{
        availabelDoctor = doctorSchedules[doctor.id][day]
    }
    availabelDoctor = availabelDoctor[0]+" AM to " + availabelDoctor[1]+" PM";
    doctor['day'] = day 
    console.log( availabelDoctor);
    res.send({doctor,availabelDoctor});
});


app.listen(4400)