import { Types } from "mongoose";


export interface CommentType {
  _id: string;
  text: string;
  user:string;
}
