const LocationData = require('../Models/LocationsModels');
const mealtypeData = require('../Models/mealType');
const restaurantsData = require('../Models/Restaurants');
const menu = require('../Models/MenuModels');
const registerDetailsData = require('../Models/LoginDetails');
const bcrypt = require('bcrypt');

exports.getLocations = (req,res) => {
    LocationData.find()
    .then((result) => {
        res.status(200).json({
            message:"data is fetched",
            DATA: result
        })
    })
    .catch((err) => {
        res.status(500).json({
            message:"data is not fetched",
            ERROR: err
        })
    })
}

exports.getmealType = (req,res) => {
    mealtypeData.find()
    .then((result) => {
        res.status(200).json({
            message:"data is fetched",
            DATA: result
        })
    })
    .catch((err) => {
        res.status(500).json({
            message:"data is not fetched",
            ERROR: err
        })
    })
}

exports.getRestaurantsByCity = (req,res) =>{
    restaurantsData.find({city:req.params.id})
    .then((result) => {
        res.status(200).json({
            message:"data is fetched",
            DATA: result
        })
    })
    .catch((err) => {
        res.status(500).json({
            message:"data is not fetched",
            ERROR: err
        })
    })
}

exports.getRestaurantsByName = (req,res) =>{
    restaurantsData.find({name:req.params.name})
    .then((result) => {
        res.status(200).json({
            message:"data is fetched",
            DATA: result
        })
    })
    .catch((err) => {
        res.status(500).json({
            message:"data is not fetched",
            ERROR: err
        })
    })
}

exports.registerUser = async (req,res) => {

    const hashedPassword = await bcrypt.hash(req.body.password,10)

    let result = await registerDetailsData.findOne({email:req.body.email})
    if(result)
    {
        console.log("user is already registered");
        return res.status(200).json({message:"user already register"});
    }
    else
    {
        const user = new registerDetailsData({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        })

        user.save((err)=>{
                    if(err)
                    {
                        console.log(err)
                    }
                    else
                    {
                        console.log("data is saved")
                        res.status(200).json({message:`${req.body.name} is Registered`})
                    }
        })
    }
}

exports.loginUser = async (req,res) => {
    let result = await registerDetailsData.findOne({email:req.body.email})

    if(result)
    {
        let passwordComparison = await bcrypt.compare(req.body.password,result.password);
        if(passwordComparison)
        {
            console.log('login successfull');
            return res.status(200).json({message:"user logged in successfully"});
        }
        else
        {
            console.log('password incorrect');
            return res.status(200).json({message:"password incorrect"});
        }
    }
    else
    {
        console.log('no user found\nfirst register');
        return res.json(200).json({message:'no user found\nfirst register'});
    }
}

exports.getRestaurants=(req,res)=>{
    let filter={};
    if(req.body.lowerCost&&req.body.UpperCost){
        filter.cost={
            $gt:req.body.lowerCost,
            $lt:req.body.UpperCost 
        }
    }
    if(req.body.Cuisine && req.body.Cuisine.length!=0){
        filter["Cuisine.name"]={$in:req.body.Cuisine}
    }
    if(req.body.city_id){
        filter.city=req.body.city_id
    }
    restaurantsData.find(filter).sort({cost:req.body.sort}).limit(2).skip(2*(req.params.currentPage-1))
    .then((data)=>{
        restaurantsData.find(filter).count()
        .then(result=>{
            res.status(200).json({
                message:"data is fetched",
                DATA:data,
                PAGES:result
            })
        })
        .catch(err=>res.status(500).json({
            message:'data is not fetched',
            ERROR:err
        }))
    })
    .catch((err)=>{
        res.status(500).json({
            message:'data is not fetched',
            ERROR:err
        })
    })}

exports.getMenu = (req,res) => {
        menu.find({restaurantName:req.params.name})
        .then(result=>{
            res.status(200).json({
                message:'menu is fetched',
                DATA:result
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:"menu is not fetched",
                ERROR:err
            })
        })
    }