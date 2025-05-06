import bmical from "../models/bmical.js";

export const read = async (req, res) => {
    try{
      res.send('Hello bmical Endpoint! read');
    }
    catch(err){
      res.status(400).json({error: err.message});
    }
  };

export const create = async (req, res) => {
  try{
    console.log(req.body)
    const bmicaled = await bmical(req.body).save();

    res.send('bmicaled');
  }
  catch(err){
    res.status(400).json({error: err.message});
  }
}

export const update = async (req, res) => {
  try{
    res.send('Hello bmical Endpoint! update');
  }
  catch(err){
    res.status(400).json({error: err.message});
  }
} 

export const remove = async (req, res) =>{
  try{
    res.send('Hello bmical Endpoint! remove');
  }
  catch(err){
    res.status(400).json({error: err.message});
  }
}
  