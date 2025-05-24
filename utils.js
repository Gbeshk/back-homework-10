const fs = require("fs/promises");

const readFile = async (filepath, parse) => {
  if (!filepath) return;
  const readData = await fs.readFile(filepath, "utf-8");
  return parse ? JSON.parse(readData) : readData;
};

const writeFile = async (filepath, data) => {
  if (!filepath) return;
  await fs.writeFile(filepath, data);
  // console.log("writed succesfully");
};

module.exports = { writeFile, readFile };
