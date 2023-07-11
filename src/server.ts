import mongoose from 'mongoose';
import axios from 'axios';
import User from '../src/models/user';
import app from './app';
import { UserType } from './types/user';

const port = process.env.PORT || 8000; 
const mongoURI = 'mongodb://localhost:27017/swift-api';



// Loading 10 users into the DB
const loadUsers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users :UserType[] = response.data;

    const existingUserIds = await User.find({}, 'id').lean();
    const existingUserIdsSet = new Set(existingUserIds.map(user => user.id));

    const newUsers = users.filter(user => !existingUserIdsSet.has(user.id));

    if (newUsers.length > 0) {

      await User.insertMany(newUsers);
      console.log('New users loaded successfully.');
    } else {
      console.log('All users are already present in the database.');
    }
  } catch (error) {
    throw new Error(`Failed to load users: ${error}`);
  }
};



mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    // At every time when server is started then it's check for the missing user and put that user only, Here we are fetching only 10 user**************
    loadUsers();
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
  });
