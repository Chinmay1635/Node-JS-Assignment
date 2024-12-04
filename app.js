const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const db = require('./dbConnection');
const School = require('./models/school');

const calculateDistance = require('./utils/calculateDisatance');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', function(req,res){
    res.json({message: "This is node JS assignment"});
});

app.post('/addSchool', async (req, res) => {
    let { name, address, latitude, longitude } = req.body;

    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ message: 'Invalid input. Please provide all required fields with valid data types.' });
    }

    if (latitude < -90 || latitude > 90) {
        return res.status(400).json({ message: 'Latitude must be between -90 and 90.' });
    }

    if (longitude < -180 || longitude > 180) {
        return res.status(400).json({ message: 'Longitude must be between -180 and 180.' });
    }

    

    try {
   
        let newSchool = await School.findOne({name:name});

        if(newSchool){
            res.status(400).json({ message: 'School already exists!'});
        }else{

            newSchool = await School.create({
               name,
               address,
               latitude,
               longitude,
           })
   
           
           res.status(201).json({ message: 'School added successfully!', school: newSchool });
        }
    } catch (err) {
        console.error('Error adding school:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.get('/listSchools', async (req, res) => {
    const { latitude, longitude } = req.query;
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

  
    if (isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({ message: 'Latitude and longitude must be valid numbers.' });
    }

    try {
        
        const schools = await School.find();

        
        const schoolsWithDistance = schools.map((school) => ({
            ...school.toObject(),
            distance: calculateDistance(userLat, userLon, school.latitude, school.longitude),
        }));

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json({
            message: 'Schools fetched and sorted by proximity.',
            schools: schoolsWithDistance,
        });
    } catch (err) {
        console.error('Error fetching schools:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


app.listen(process.env.PORT, function(){
    console.log(`Server is running on port ${process.env.PORT}`);
});