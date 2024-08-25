"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pilotModel = require('../models/pilotModel');
const dbs = require('../connection/config');
function pilot(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var { lat, lng, range } = req.query;
            const matchedPilots = yield pilotModel.find({
                coordinates: {
                    $geoWithin: {
                        $centerSphere: [[lat, lng], range]
                    }
                }
            }).sort({ work_experience_years: -1 }).limit(10);
            res.json(matchedPilots);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch pilots' });
        }
    });
}
function match(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var { lat, lng, range } = req.query;
            const matchedPilots = yield pilotModel.find({
                coordinates: {
                    $geoWithin: {
                        $centerSphere: [[lat, lng], range]
                    }
                }
            }).sort({ work_experience_years: -1 });
            res.json(matchedPilots);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch pilots' });
        }
    });
}
module.exports = {
    pilot,
    match,
};
