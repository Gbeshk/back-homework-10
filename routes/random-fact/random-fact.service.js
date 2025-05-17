const facts = [
  "Bananas are radioactive due to their potassium content (specifically potassium-40).",
  "Octopuses have three hearts and blue blood.",
  "Wombat poop is cube-shaped to prevent it from rolling away.",
];
const getRandomFact = (req, res) => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  const randomFact = facts[randomIndex];
  res.json(randomFact);
};
module.exports = { getRandomFact };
