import { Request } from '@hapi/hapi';
import { AuthenticateClientDTO } from '../Models/Client/dto';
import { CreateUserDTO } from '../Models/User/dto';
import { UpdateUserDTO } from '../Models/User/dto/updateUser.dto';
import { userService, UserService } from '../Services/user.service';

export class UserController {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function, no-shadow
  constructor(private readonly userService: UserService) {}

  public async CreateUser(request: Request) {
    const createUserDTO = request.payload as CreateUserDTO;
    const newUser = await this.userService.CreateUser(createUserDTO);

    return newUser;
  }

  public async UpdateUser(request: Request) {
    const userId = request.auth.credentials.id as number;
    const updateUserDTO = request.payload as UpdateUserDTO;
    const newUser = await this.userService.UpdateUser(userId, updateUserDTO);

    return newUser;
  }

  public async AuthenticateUser(request: Request) {
    const authenticateClientDTO = request.payload as AuthenticateClientDTO;
    const jwt = await this.userService.AuthenticateUser(authenticateClientDTO);

    return { jwt };
  }
}

export const userController = new UserController(userService);
