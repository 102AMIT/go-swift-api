import { Request, Response } from "express";
import User from "../models/user";
import Blog from "../models/blog";
import Comment from "../models/comment";
import { BlogType } from "../types/blog";
import { UserType } from "../types/user";

const createBlog = async (req: Request, res: Response) => {
  const { id, title, body }: { id: string; title: string; body: string } =
    req.body;
  try {
    if (body.length > 200) {
      return res
        .status(400)
        .json({ error: "Blog post body must be less than 200 characters" });
    }

    const user: Partial<UserType> | null | any = await User.findOne({ id: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const blog: any = await Blog.create({ id, title, body });

    if (user.blogs) {
      user.blogs.push(blog);
      await user.save();
    }
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog post" });
  }
};

const getUserBlogs = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blogs: BlogType[] = await Blog.find({ id: id });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user blogs" });
  }
};

const getBlogWithComments = async (req: Request, res: Response) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById({ _id: blogId }).populate("comment");

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    await Blog.deleteOne({ _id: blog });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog post" });
  }
};

const addComment = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const { text }: { text: string } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const comment = await Comment.create({ text });

    comment.user = blog.id;
    await comment.save();
    blog.comment.push(comment);
    await blog.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  const { blogId, commentId } = req.params;
  const { userId } = req.body;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.user === userId) {
      comment.deleteOne();
    }

    // Remove the comment from the blog's comment array
    const commentIndex = blog.comment.indexOf(comment);
    blog.comment.splice(commentIndex, 1);

    await blog.save();

    await Comment.findByIdAndDelete(commentId);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

export default {
  createBlog,
  getUserBlogs,
  getBlogWithComments,
  deleteBlog,
  addComment,
  deleteComment,
};
