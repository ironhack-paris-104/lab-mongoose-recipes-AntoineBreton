const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");

// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(async (x) => {
    try {
      console.log(`Connected to the database: "${x.connection.name}"`);
      // Before adding any recipes to the database, let's remove all existing ones

      await Recipe.deleteMany();

      //itération 2 : //

      const newRecipe = await Recipe.create({
        title: "Tarte à la caca-wet",
        level: "UltraPro Chef",
        ingredients: ["Pipi", "Caca", "Testostérone", "Crottes de nez"],
        cuisine: "Cuisinella",
        dishType: "snack",
        image: "https://images.media-allrecipes.com/images/75131.jpg",
        duration: 5,
        creator: "Antoine Breton",
        created: new Date(),
      });
      console.log(newRecipe.title);

      //itération 3: //

      const insertedRecipes = await Recipe.insertMany(data);

      for (const insertedRecipesTitles of insertedRecipes) {
        console.log(insertedRecipesTitles.title);
      }

      //itération 4//

      const updatedRecipe = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        { new: true }
      );
      console.log("update done successfully");
      console.log(updatedRecipe);

      // iteration 5://
      const removedRecipe = await Recipe.deleteOne({ title: "Carrot Cake" });

      console.log(removedRecipe);
    } catch (error) {
      console.error("Error connecting to the database", error);
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    mongoose.disconnect();
    console.log("Disconnected from the database");
  });
