const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} ${req.ip}`);
  
  // Добавляем timestamp в req для использования в контроллерах
  req.timestamp = timestamp;
  
  next();
};

module.exports = logger;
