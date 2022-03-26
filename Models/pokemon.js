// Import mongoose
import mongoose from 'mongoose';

const PokemonSchema = new mongoose.Schema({
  url_image: String,
  type: Array,
  id: Number,
  name: String
});

// Export model
module.exports = Pokemon = mongoose.model("pokemon", PokemonSchema)
