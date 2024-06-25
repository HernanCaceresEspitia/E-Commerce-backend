import { Injectable } from '@nestjs/common';

type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string;
  city?: string;
};

//* BBDD Simulada

const users: User[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'john.doe@example.com',
    name: 'John Doe',
    password: 'securepassword1',
    address: '123 Main St, Springfield',
    phone: '123-456-7890',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    password: 'securepassword2',
    address: '456 Elm St, Metropolis',
    phone: '987-654-3210',
    country: 'USA',
    city: 'Metropolis',
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    email: 'michael.brown@example.com',
    name: 'Michael Brown',
    password: 'securepassword3',
    address: '789 Oak St, Gotham',
    phone: '555-555-5555',
    country: 'USA',
    city: 'Gotham',
  },
  {
    id: '6fa459ea-ee8a-3ca4-894e-db77e160355e',
    email: 'emily.jones@example.com',
    name: 'Emily Jones',
    password: 'securepassword4',
    address: '321 Pine St, Star City',
    phone: '444-444-4444',
    country: undefined,
    city: 'Star City',
  },
  {
    id: '16fd2706-8baf-433b-82eb-8c7fada847da',
    email: 'william.green@example.com',
    name: 'William Green',
    password: 'securepassword5',
    address: '654 Maple St, Central City',
    phone: '333-333-3333',
    country: 'USA',
    city: undefined,
  },
];

@Injectable()
export class UsersRepository {
  //* Obtener todos los usuarios

  async getUsers(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const usersList = users.slice(start, end);

    return await usersList.map(
      ({ password, ...userNoPassword }) => userNoPassword,
    );
  }

  //* Obtener usuario por ID

  async getUserById(id: string) {
    const userFound = users.findIndex((u) => u.id === id);
    if (userFound === -1) return `No se encontró usuario con ID: ${id}`;
    const { password, ...userNoPassword } = users[userFound];
    return userNoPassword;
  }

  //* Crear usuario

  async createUser(user: User) {
    users.push({ ...user, id: user.email });
    return user.email;
  }

  //* Modificar información de usuario

  async updateUser(id: string, user: User) {
    const userFound = users.findIndex((u) => u.id === id);
    if (userFound === -1) return `No se encontró usuario con ID: ${id}`;

    users[userFound] = { ...users[userFound], ...user };
    return users[userFound].id;
  }

  //* Eliminar usuario

  async deleteUser(id: string) {
    const userFound = users.findIndex((u) => u.id === id);
    if (userFound === -1) return `No se encontró usuario con ID: ${id}`;

    users.splice(userFound, 1);
    return id;
  }

  //* Encontrar usuario por email

  getuserByEmail(email: string) {
    return users.find((user) => user.email === email);
  }
}
