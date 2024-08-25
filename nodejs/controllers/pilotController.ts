const pilotModel = require('../models/pilotModel')
const dbs = require('../connection/config')
import { Request, Response } from 'express';

async function pilot(req: Request, res: Response){
  try {
    var { lat, lng, range} = req.query;
    const matchedPilots = await pilotModel.find({
      coordinates: {
        $geoWithin: {
          $centerSphere: [[lat, lng], range] 
        }
      }
    }).sort({ work_experience_years: -1 }).limit(10);
    res.json(matchedPilots);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch pilots' });
    }
}

async function match(req: Request, res: Response){
    try {
      var { lat, lng, range} = req.query;
      const matchedPilots = await pilotModel.find({
        coordinates: {
          $geoWithin: {
            $centerSphere: [[lat, lng], range] 
          }
        }
      }).sort({ work_experience_years: -1 });
      res.json(matchedPilots);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pilots' });
      }
}


module.exports = {
    pilot,
    match,
}