import mongoose, { Model } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender:{
    type:String,
    required:true,
  },
  nationality:{
    type:String,
    required:true,
  },
  probability:{
    type:Number,
    required:true,
  }

});
interface IUser {
    name: string;
    gender: string;
    nationality: string;
    probability: number;
  }

interface IUserDocument extends IUser, Document {}
interface IUserModel extends Model<IUserDocument> {}

const UserModel: IUserModel =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);

export default UserModel;