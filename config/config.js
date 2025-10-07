import fastifySession from '@fastify/session';
import ConnectMongoDBSession from 'connect-mongodb-session';
import dotenv from 'dotenv';
import { Admin } from '../models/index.js';

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;

// MongoDB session store
const MongoDBStore = ConnectMongoDBSession(fastifySession);

export const sessionStore = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
});

sessionStore.on('error', (error) => {
  console.error('Session store error:', error);
});

// Example authentication function
export const authenticate = async (email, password) => {
  // eska use sirf firt time enter ke liye karenge

  // if (email && password) {
  //   if (email === 'harshit12@gmail.com' && password === '12345678') {
  //     return { email, password };
  //   }
  //   return null;
  // }

  // Uncomment for real DB login
  
  if (email && password) {
     const user = await Admin.findOne({ email });
      if (!user) return null;
       if (user.password === password) {
         return Promise.resolve({ email, password });
         } else { return null; } } 
         return null;
  
};
