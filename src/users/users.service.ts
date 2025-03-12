import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}

// TODO: Shift+ENTER w insercie do pisania w nowej linii
// Dlaczego czasami nie wyświetla się numer wiersza?
// Proofchecking języków naturalnych
// Snippety (~log)
// C-q do wyświetlania dokumentacji
// Chcę mieć lualine na szerokości całego ekranu, nie okna
// Wkurwia mnie deferrowanie podpowiedzi
// Chcę żeby neo-tree miał kolory zgodne ze stanem plików w repozytorium
// I muszę skopiować kolory z webstorma
