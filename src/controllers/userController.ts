import { Request, Response } from "express";
import User from "../models/user";
import { UserType } from "../types/user";

const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    await User.deleteMany({});

    // TODO : For getting messages i'm using status code 200 we can replace it with 204 . Status code 204 is used when there is no content in the response body.
    // res.status(200).json({ message: "All users deleted" });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete users" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ id: userId });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // TODO : For getting messages i'm using status code 200 we can replace it with 204
    // res.status(200).json({ message: "User deleted" });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" });
  }
};

const createUser = async (req: Request, res: Response) => {
  const user = req.body as UserType;

  try {
    const existingUser = await User.findOne({ id: user.id });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    await User.create(user);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updatedUser = req.body as UserType;

  try {
    const existingUser = await User.findOne({ id: userId });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (updatedUser.id !== existingUser.id) {
      const userWithUpdatedId = await User.findOne({ id: updatedUser.id });
      if (userWithUpdatedId) {
        return res.status(409).json({ error: "User ID already exists" });
      }
    }

    const updatedUserObj = {
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      address: updatedUser.address,
      phone: updatedUser.phone,
      website: updatedUser.website,
      company: updatedUser.company,
    };

    const updatedUserResult = await User.findOneAndUpdate(
      { id: userId },
      updatedUserObj,
      { new: true }
    );

    if (!updatedUserResult) {
      return res.status(500).json({ error: "Failed to update user" });
    }
    // TODO : For getting messages i'm using status code 200 we can replace it with 204
    // res.status(200).json({ message: "User updated" });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

export default {
  deleteAllUsers,
  deleteUser,
  getUser,
  createUser,
  updateUser,
};
