import { UserModel } from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { JWT_SECRET_KEY } from "../Configuration/config.js";
import { QuoteModel } from "../Model/quoteModel.js";
const resolvers = {
  Query: {
    users: async () => await UserModel.find(),
    user: async (_, { _id }) => await UserModel.findOne({ _id }),
    quotes: async () =>
      await QuoteModel.find({}).populate("by", "_id, firstName"),
    userQuote: async (_, { by }) => await QuoteModel.find({ by }),
    myProfile: async (_, args, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      return await UserModel.findOne({ _id: userId });
    },
  },

  User: {
    quotes: async (user) => await QuoteModel.find({ by: user._id }),
  },

  Mutation: {
    signupUser: async (_, { userNew }) => {
      const hasPassword = await bcrypt.hash(userNew.password, 12);
      const userExist = await UserModel.findOne({ email: userNew.email });
      if (userExist) {
        throw new Error("User is already exists");
      }
      const userData = new UserModel({
        ...userNew,
        password: hasPassword,
      });
      try {
        return await userData.save();
      } catch (err) {
        throw new Error("some thing going wrong".err.message);
      }
    },
    signinUser: async (_, { userSignin }) => {
      const user = await UserModel.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User dosent exists with that email");
      }
      const doMatch = await bcrypt.compare(userSignin.password, user.password);
      if (!doMatch) {
        throw new Error("Invalid Password or email");
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

      return { token };
    },
    createQuote: async (_, { name }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const quoteData = new QuoteModel({
        name,
        by: userId,
      });

      const result = await quoteData.save();
      if (result) {
        return " Quote has saved successfully";
      }
    },
  },
};

export { resolvers };
