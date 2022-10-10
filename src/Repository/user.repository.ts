import { In, Repository } from 'typeorm';
import { CreateUserDTO } from '../Models/User/dto';
import { User } from '../Models/User/user.model';
import { AppDataSource } from '../ormconfig';

export class UserRepository {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
  constructor(private readonly userRepo: Repository<User>) {}

  public async create(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = new User(createUserDTO);
    return this.userRepo.save(newUser);
  }

  public async createMany(createUsersDTO: CreateUserDTO[]): Promise<User[]> {
    const newUsers = createUsersDTO.map((createUser) => new User(createUser));
    return this.userRepo.save(newUsers);
  }

  public async findById(id: number): Promise<User> {
    return this.userRepo.findOne({
      where: {
        id,
      },
      relations: {
        client: true,
        address: true,
      },
    });
  }

  public async findByCpf(cpf: string): Promise<User> {
    return this.userRepo.findOne({
      where: {
        cpf,
      },
      relations: {
        client: true,
        address: true,
      },
    });
  }

  public async findByCpfs(cpfs: string[]): Promise<User[]> {
    return this.userRepo.find({
      where: {
        cpf: In(cpfs),
      },
      relations: {
        client: true,
        address: true,
      },
    });
  }

  public async findByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({
      where: {
        client: { email },
      },
      relations: {
        client: true,
        address: true,
      },
    });
  }

  public async update(user: User): Promise<User> {
    return this.userRepo.save(user);
  }
}

export const userRepository = new UserRepository(AppDataSource.getRepository(User));
