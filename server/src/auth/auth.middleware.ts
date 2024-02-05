import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authorization.slice(7); // Remove 'Bearer ' from the token

    try {
      const decodedToken: any = jwt.verify(token, 'your-secret-key'); // Replace with your secret key
      const userId = decodedToken.userId;
      const user = await this.usersService.findById(userId);

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Assign the user to the request object
      (req as any).user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
