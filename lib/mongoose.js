import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI // Replace with your MongoDB connection URI
console.log(`MongoDB URL is : ${MONGODB_URI}`);

export default function mongooseConnect() {


  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

  db.once('open', () => {
    console.log('Connected to MongoDB');
  });


};
