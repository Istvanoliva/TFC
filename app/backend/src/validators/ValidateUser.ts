import { Request, Response, NextFunction } from 'express';
import * as joi from 'joi';

class ValidateUser {
  validateEmail = joi.object({
    email: joi.string()
      .email()
      .required()
      .messages({
        'string.empty': 'All fields must be filled',
      }),
  });

  validatePassword = joi.object({
    password: joi.string()
      .required()
      .messages({
        'string.empty': 'All fields must be filled',
      }),
  });

  emailValidator = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const { error } = this.validateEmail.validate({ email });
    if (error) return res.status(400).json({ message: error.message });
    next();
  };

  passwordValidator = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;

    const { error } = this.validatePassword.validate({ password });
    if (error) return res.status(400).json({ message: error.message });
    next();
  };
}

export default ValidateUser;
