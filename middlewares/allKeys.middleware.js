module.exports = (req, res, next) => {
  if (!req.body?.title || !req.body?.price) {
    return res.status(400).json({ error: "price and content are required" });
  }
  next();
};
