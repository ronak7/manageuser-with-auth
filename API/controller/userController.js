const { check, validationResult } = require('express-validator')
const User = require('../model/User')
const bcrypt = require('bcrypt')

const getAllUserData = async (req, res) => {
    try {
        let userData = await User.find().select("-password")

        res.status(200).json({
            status: true,
            msg: 'Get users',
            data: userData
        })
    } catch (error) {
        res.status(200).json({
            status: false,
            msg: "Something went wring!"
        })
    }
}

const getUserData = async (req, res) => {
    try {
        let reqData = req.params.id
        let userData = await User.find({ _id: reqData });
        res.status(200).json({
            status: true,
            msg: 'Get user data',
            data: userData ? userData : []
        })
    } catch (error) {
        res.status(200).json({
            status: false,
            msg: "Something went wring!"
        })
    }
}

const loggedInUserData = async (req, res) => {
    try {
        let result = await User.findOne({ _id: '621a13820366b414a66234b6'});
        console.log(result);
        res.status(200).json({
            status: true,
            msg: 'User data',
            data: result
        })
    } catch (error) {
        res.status(200).json({
            status: false,
            msg: "Something went wring!",
            msg1: error.message
        })
    }
}

const addUserData = async (req, res) => {
    try {
        await check('firstname', 'Please enter First name').not().isEmpty().run(req);
        await check('lastname', 'Please enter last name').not().isEmpty().run(req);
        await check('email', 'Please enter Eamil').not().isEmpty().run(req);
        await check('email', 'Please enter valid Eamil').isEmail().run(req);
        await check('password', 'Please enter Password').not().isEmpty().run(req);
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ status: false, msg: result.array()[0].msg });
        }

        let reqData = req.body
        reqData.image = req.file != null ? req.file.filename : ""

        let ckuserData = await User.find({ email: req.body.email });
        if (ckuserData.length > 0) {
            res.status(200).json({
                status: false,
                msg: 'Duplicate Email.',
                data: null
            })
        } else {
            let userData = new User(reqData);
            userData.password = reqData.password;
            let result = await userData.save();
            res.status(200).send({
                status: true,
                msg: 'User added',
                data: result
            })
        }

    } catch (error) {
        res.status(200).json({
            status: false,
            msg: "Something went wring!",
            msg2: error.message
        })
    }
}

const updateUserData = async (req, res) => {
    try {
        await check('firstname', 'Please enter First name').not().isEmpty().run(req);
        await check('lastname', 'Please enter last name').not().isEmpty().run(req);
        await check('email', 'Please enter Eamil').not().isEmpty().run(req);
        await check('email', 'Please enter valid Eamil').isEmail().run(req);
        // await check('password', 'Please enter Password').not().isEmpty().run(req);
        const valResult = validationResult(req);
        if (!valResult.isEmpty()) {
            return res.status(400).json({ status: false, msg: valResult.array()[0].msg });
        }

        let reqData = req.body
        let reqDataId = req.params.id
        reqData.image = (typeof req.file !== "undefined") ? req.file.filename : (reqData.oldFile == "" ? "" : reqData.oldFile )
        if (typeof reqData.password !== "undefined" && reqData.password.trim() != '') {
            reqData.password = await bcrypt.hash(reqData.password, 10);
        } else {
            delete reqData.password;
        }
        let result = await User.updateOne(
            {_id: reqDataId},
            {
                $set: reqData
            }
        )

        res.status(200).send({
            status: true,
            msg: 'User updated',
            data: result
        })
    } catch (error) {
        res.status(200).json({
            status: false,
            msg: "Something went wring!",
            msg2: error.message
        })  
    }
}

const deleteUserData = async (req, res) => {
    try {
        let reqId = req.params.id
        let result = await User.deleteOne({_id: reqId});

        res.status(200).send({
            status: true,
            msg: 'User deleted',
            data: result
        })
    } catch (error) {
        res.status(200).json({
            status: false,
            msg: "Something went wring!"
        })
    }
}

const filterUser = async (req, res) => {
    try {
        let reqData = req.body
        reqData.status = ("status" in reqData) ? reqData.status : true; 
        let regexSearch = new RegExp(reqData.search, "i")
        if (("search" in reqData) && reqData.search != "") {
            let result = await User.find({
                $and: [
                    { status: reqData.status },
                    {
                        $or: [
                            { firstname: regexSearch },
                            { lastname: regexSearch },
                            { email: regexSearch },
                        ]
                    }
                ]
            });
            res.status(200).json({
                status: true,
                msg: "User data",
                data: result,
                count: result.length
            })
        } else {
            let result = await User.find({ status: reqData.status });
            res.status(200).json({
                status: true,
                msg: "User data",
                data: result,
                count: result.length
            })
        }        
    } catch (error) {
        res.status(200).json({
            status: false,
            msg: "Something went wring!",
            msg1: error.message
        })
    }
}

const changeUserStatus = async (req, res) => {
    try {
        let userStatusChange = await User.updateOne(
            {_id: req.params.id},
            {
                $set: { 
                    status: req.params.status
                }
            }
        )
        res.status(200).json({
            status: true,
            msg: "User status changed",
            data: userStatusChange
        })
    } catch (error) {
        
    }
}


module.exports = {
    getUserData,
    addUserData,
    updateUserData,
    deleteUserData,
    getAllUserData,
    filterUser,
    changeUserStatus,
    loggedInUserData
}