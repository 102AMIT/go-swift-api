import { Types } from "mongoose";
import { CommentType } from "./comment";

export interface BlogType {
  id: string;
  title: string;
  body: string;
  comment: CommentType[];
}
