module.exports = (req, res, next) => {
  const pass = Math.random();
  if (pass <= 0.5) {
    return res.status(403).json({ error: "no permission" });
  }

  next();
};
