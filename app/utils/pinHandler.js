import Pin from "../models/pins.js";
import User from "../models/users.js";

module.exports = {

    getMyPins(req, res) {
        Pin.find({ creator: req.user._id }).populate('creator', 'username').exec(function(err, pins) {
            if (err) throw err;
            res.json({ pins: pins });
        });
    },

    getUserPins(req, res) {
        User.findOne({ username: req.params.username }, function(err, user) {
            if (err) throw err;
            console.log(user);
            Pin.find({ creator: user._id }).populate('creator', 'username').exec(function(err, pins) {
                if (err) throw err;
                res.json({ pins: pins });
            });
        })
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
        Pin.findOne({ _id: req.body.id }, function(err, pin) {
            if (err) throw err;
            if (pin.creator.equals(req.user._id)) {
                pin.remove();
                res.json({ pinRemoved: true });
            } else {
                res.json({ pinRemoved: false });
            }
        });
    }
}
