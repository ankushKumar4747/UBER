const captainModel = require("../models/captain.model")
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator")

module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array()
            })
        }
        const { fullname, email, password, vehicle } = req.body;
        const isCaptainAlreadyExist = await captainModel.findOne({ email: email });

        if (isCaptainAlreadyExist) {
            return res.status(400).json({
                message: "captain already exist"
            })
        }
       const user = new captainModel({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            email,
            password,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                type: vehicle.vehicleType
            }
        });
        const hashedPassword = await user.hashPassword(password);
        user.password = hashedPassword;
        await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });
        // const captain = captainService.createCaptain({
        //     firstname: fullname.firstname,
        //     lastname: fullname.lastname,
        //     email,
        //     password: hashedPassword,
        //     color: vehicle.color,
        //     plate: vehicle.plate,
        //     capacity: vehicle.capacity,
        //     type: vehicle.type
        // });

        const token = user.generateToken();
        res.status(200).json({ token, user });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}