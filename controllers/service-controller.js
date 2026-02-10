const Service = require("../models/service-model");

const services = async (req, res) => {
    try {
        const response = await Service.find();
        if(!response){
            return res.status(401).json({message: "No Service Found"});
        }
        return res.status(200).json({message: response});
    } catch (error) {
        return res.status(500).json({message: "Message not delivered"});
    }
}

module.exports = services;