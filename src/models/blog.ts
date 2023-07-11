import mongoose from 'mongoose';
import { BlogType } from '../types/blog';

const blogSchema = new mongoose.Schema<BlogType>({
  id:{ type: String, required: true},
  title: { type: String, required: true },
  body: { type: String, required: true, maxlength: 200 },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

export default mongoose.model<BlogType>('Blog', blogSchema);
