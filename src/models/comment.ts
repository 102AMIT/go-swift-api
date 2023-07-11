import mongoose from 'mongoose';
import { CommentType } from '../types/comment';

const commentSchema = new mongoose.Schema<CommentType>({
  text: { type: String, required: true },
  user: { type: String },

});

export default mongoose.model<CommentType>('Comment', commentSchema);
