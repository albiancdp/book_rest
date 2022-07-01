const apiCors = {
  origin: ['*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Content-Disposition', 'allow-control-allow-origin'],
  exposedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Content-Disposition', 'allow-control-allow-origin'],
  maxAge: 3600,
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

export default apiCors;
