import * as bcrypt from 'bcryptjs';
import User from '../database/models/userModel';
import HttpError from '../helpers/HttpError';
import { ILogin } from '../typescript/interfaces/userInterface';
import { jwtGenerator } from '../helpers/jwtGenerator';

class UserService {
  createToken = async (login: ILogin) => {
    const user = await User.findOne({ where: { email: login.email } });
    if (!user || !(await bcrypt.compare(login.password, user.password))) {
      throw new HttpError(401, 'Incorrect email or password');
    }

    return jwtGenerator(user);
  };
}

export default UserService;
