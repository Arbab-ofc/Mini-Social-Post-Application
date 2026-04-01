const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === 'MulterError') {
    return res.status(400).json({ message: err.message || 'File upload error' });
  }

  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    message: err.message || 'Internal server error'
  });
};

module.exports = {
  notFound,
  errorHandler
};
