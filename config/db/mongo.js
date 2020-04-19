const DB_USER = 'andresisazaa_web';
const DB_PASS = '0987654321';
const DB_HOST = 'cluster0-5j8vz.mongodb.net/test?retryWrites=true&w=majority';
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;
const MONGODB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

module.exports = {
  MONGO_URI,
  MONGODB_OPTIONS,
};
