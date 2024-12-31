module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized - Missing Authorization header' });
  }

  next();
};
