import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRespository: UsersRepository) {}
  getAuth() {
    return 'Autenticación...';
  }

  signIn(email: string, password: string) {
    if (!email || !password) return `Usuario y contraseña requeridos`;
    const user = this.usersRespository.getuserByEmail(email);

    if (!user || user.password !== password) {
      return 'Credenciales incorrectas';
    }
    return 'Usuario logueado... (se envía token)';
  }
}
