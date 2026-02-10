const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Service = require("../models/service-model");

const getAllUsers = async (req,res, next) => {
    try {
        const users = await User.find({}, {password: 0});
        if(!users || users.length === 0){
            return res.status(404).json({message: "No User Found"});
        }
        return res.status(200).json(users);   
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({_id: id}, {password: 0});
        if(!user || user.length === 0){
            return res.status(404).json({message: "No User Found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);        
    }
}

const updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        //console.log("User Id: ", id);        
        const updatedUserData = req.body;
        //console.log("Body : ", updatedUserData);        
        const updatedData = await User.updateOne({_id: id}, {
            $set: updatedUserData
        })

        //console.log("Updated Data: ", updatedData);
        
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);        
    }
}

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        if(!contacts || contacts.length === 0){
            return res.status(404).json({message: "No Contact Found"});
        }
        return res.status(200).json(contacts);   
    } catch (error) {
        next(error);
    }
}

const getAllServices = async (req, res, next) => {  
    try {
        console.log("Hello");
        const services = await Service.find();
        if(!services || services.length === 0){
            return res.status(404).json({message: "No Service Found"});
        }
        return res.status(200).json(services);   
    } catch (error) {
        next(error);
    }
}

const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(await User.deleteOne({_id: id})){
            return res.status(200).json({message: "User Deleted Successfully."});
        }
        else{
            return res.status(404).json({message: "User Not Found."});
        }
    } catch (error) {
        next(error);        
    }
}

const deleteContactById = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("Here It Comes");        
        if(await Contact.deleteOne({_id: id})){
            return res.status(200).json({message: "Contact Deleted Successfully."});
        }
        else{
            return res.status(404).json({message: "Contact Not Found."});
        }
    } catch (error) {
        next(error);        
    }
}

module.exports = { getAllUsers, getAllContacts, getAllServices, deleteUserById, deleteContactById, getUserById, updateUserById };