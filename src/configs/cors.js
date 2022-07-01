const apiCors = {
  origin: ['*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Content-Disposition'],
  exposedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Content-Disposition'],
  maxAge: 3600,
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

export default apiCors;
