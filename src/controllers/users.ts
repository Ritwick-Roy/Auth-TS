import express from 'express';
import {UserModel} from '../models/Users';

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
  'authentication.sessionToken':sessionToken,
});

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string,any> ) => new UserModel(values).save().then((user)=> user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id:id});
export const updateUserById = (id: string, values: Record<string,any>) => UserModel.findByIdAndUpdate(id, values);

export const getUser = async (req: express.Request, res: express.Response) =>{
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const getAllUsers = async (req: express.Request, res: express.Response) =>{
  try {

    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const deleteUser = async (req: express.Request, res: express.Response) =>{
  try {

    const { id } = req.params;
    const deleteUser = await deleteUserById(id);

    return res.json(deleteUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {

    const { id } = req.params;
    const { username } = req.body;

    if (!username)
      return res.sendStatus(400);

    const user = await getUserById(id);
    
    user.username = username;
    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}