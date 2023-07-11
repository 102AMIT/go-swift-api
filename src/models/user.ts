import mongoose from 'mongoose';
import { UserType } from '../types/user';


const userSchema = new mongoose.Schema<UserType>({
  id: { type: Number, required: true , unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    suite: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
    geo: {
      lat: { type: String, required: true },
      lng: { type: String, required: true },
    },
  },
  phone: { type: String, required: true },
  website: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    catchPhrase: { type: String, required: true },
    bs: { type: String, required: true },
  },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
});

export default mongoose.model<UserType>('User', userSchema);
