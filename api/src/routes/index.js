const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiDogs = async () => {
  const apiURL = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiData = await apiURL.data.map((data) => {
    const { id, weight, height, name, life_span, temperament, image } = data;
    return {
      id,
      name,
      weight: weight.metric,
      height: height.metric,
      life_span,
      temperaments: temperament?.split(", "),
      image: image.url,
    };
  });
  return apiData;
};

const getDbDogs = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attrributes: [],
      },
    },
  });
};

const getAllDogs = async () => {
  let apiDogs = await getApiDogs();
  const dbDogs = await getDbDogs();
  const allDogs = apiDogs.concat(dbDogs);
  return allDogs;
};

router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let allDogs = await getAllDogs();
  if (name) {
    let dogName = await allDogs.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    dogName.length
      ? res.status(200).send(dogName)
      : res.status(404).send("No existe la raza");
  } else {
    res.status(200).send(allDogs);
  }
});

router.get("/temperaments", async (req, res) => {
  const apiDogs = await getApiDogs();
  //console.log(apiTemperaments)
  const dogTemperaments = apiDogs.map((el) => el.temperaments);
  //(console.log(temperaments)
  const uniques = {};
  dogTemperaments.forEach((list) => {
    list?.forEach((t) => {
      uniques[t] = true;
    });
  });
  const uniqueTemperaments = Object.keys(uniques).sort();

  //console.log(uniqueTemperaments)
  uniqueTemperaments.forEach((el) => {
    Temperament.findOrCreate({
      where: { name: el },
    });
  });
  const allTemperaments = await Temperament.findAll();
  res.send(allTemperaments);
});

router.post("/dogs", async (req, res) => {
  const { name, height, weight, life_span, temperaments, image } = req.body;
  const dogCreated = await Dog.create({
    weight,
    height,
    name,
    life_span,
    image,
  });

  let temperamentDb = await Temperament.findAll({
    where: { name: temperaments },
  });
  dogCreated.addTemperament(temperamentDb);
  res.send("Creación de perro exitosa");
});

router.get("/dogs/:id", async (req, res) => {
  const id = req.params.id;
  const allDogs = await getAllDogs();
  if (id) {
    let dogId = await allDogs.filter((el) => el.id == id);
    dogId.length
      ? res.status(200).json(dogId)
      : res.status(404).send("No hay una raza con ese ID");
  }
});

module.exports = router;
