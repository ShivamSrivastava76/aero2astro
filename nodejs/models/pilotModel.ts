const pilotmongoose = require('mongoose');

const pilotSchema = new pilotmongoose.Schema({
  name: {
    type: String,
    required:true
  },
  profileImage:{
    type: String,
    required:true
  },
  workExperience: {
    type: Number,
    required:true
  },
  location:{
    type: String,
    required:true
  },
  coordinates: {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
},{timestamp:true}
);

const Pilot = pilotmongoose.model('Pilot', pilotSchema);

module.exports =  Pilot;
