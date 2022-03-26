const router = require('express').Router();
const Pokemon =require('../Models/pokemon')




//get all pokemons
router.get('/',async(req,res)=>{
    try {
     
        const pokemons= await Pokemon.find()
        res.send({pokemons,msg:"all the poks "})
    } catch (error) {
        console.log(error)
        res.status(401).send({msg:"error while getting all poks"})
    }
    })

    //add new pokemon
router.post('/pokemons', async(req,res)=>{
    const {
        url_image: urlImage,
        type,
        id,
        name,
      } = req.body;
    
    const newPokemon = new Pokemon({   urlImage, type,
        id,
        name,    })
  
    try {
          
          await newPokemon.save()
          res.status(201).send({ message: 'New pokemon Created', pokemon: newPokemon })
        
      } catch (error) {
        console.log(error)
          res.status(401).send({msg:"cant post pokemon"})
  
      }
  })
    //update pokemon
    router.put("/:id", async(req,res)=>{

        try {
          const updatedPokemon = await Pokemon.updateOne(
            { _id: req.params.id },
            { $set: { ...req.body } }
          );
          console.log(updatedPokemon);
          if (updatedPokemon.modifiedCount) {
            return res.send({ msg: "POKEMON updated with success :) ",updatedPokemon });
          }
          res.status(400).send({ msg: "oops! theres no modification.." });
        } catch (error) {
          res.status(400).send({ msg: "sorry we cannot modify this POKEMON " });
        }  
      })
      //delete POKEMON
router.delete('/:id',async(req,res)=>{
    const { id } = req.params
      try {
          const result = await Pokemon.findByIdAndRemove(id)
          result.deletedCount ? 
          res.send({  msg:'successfully deleted'}) :  res.send({  msg:'pokemon  is already deleted :) '})
      } catch (error) {
          res.status(400).send('sorry ,pokemon cant be  deleted :(')
      }
  })
 //get pokemon by id
router.get('/:id',async(req,res)=>{
    try {
      const { id } = req.params
      const pokemon= await Pokemon.findById(id)
        res.send({pokemon,msg:"pokemon successfully "})
    } catch (error) {
        console.log(error)
        res.status(401).send({msg:"error while getting one pokemon"})
    }
    })
export default router;