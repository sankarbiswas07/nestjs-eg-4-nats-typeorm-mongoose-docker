import { Types } from "mongoose";

export const SafeMongoIdTransform = ({ value }) => {
    try {
      if (
        Types.ObjectId.isValid(value) &&
        new Types.ObjectId(value).toString() === value
      ) {
        return value;
      }
      throw new Error('Id validation fail');
    } catch (error) {
      throw new Error('Id validation fail');
    }
  };