import Pin from "../models/pins.js";
import User from "../models/users.js";

module.exports = {

    getUserPins(req, res) {
        Pin.find({ creator: req.user._id }).populate('creator', 'username').exec(function(err, pins) {
            if (err) throw err;
            res.json({ pins: pins });
        });
    },

    getAllPins(req, res) {
        Pin.find({}).populate('creator', 'username').exec(function(err, pins) {
            if (err) throw err;
            res.json({ pins: pins });
        });
    },

    addPin(req, res) {
        Pin.create({
            title: req.body.title,
            src: req.body.src,
            creator: req.user._id
        }, function(err, pin) {
            if (err) throw err;
            res.json({ pin: pin });
        })
    },

    deletePin(req, res) {
        Pin.find({ _id: req.body.id }, function(err, pin) {
            if (err) throw err;
            if (pin.creator.equals(req.user._id)) {
                pin.remove();
                res.json({ pinRemoved: true });
            }
            res.json({ pinRemoved: false });
        })
    }
}
