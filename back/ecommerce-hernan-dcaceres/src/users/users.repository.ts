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
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    password: 'securepassword1',
    address: '123 Main St, Springfield',
    phone: '123-456-7890',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    password: 'securepassword2',
    address: '456 Elm St, Metropolis',
    phone: '987-654-3210',
    country: 'USA',
    city: 'Metropolis',
  },
  {
    id: '3',
    email: 'michael.brown@example.com',
    name: 'Michael Brown',
    password: 'securepassword3',
    address: '789 Oak St, Gotham',
    phone: '555-555-5555',
    country: 'USA',
    city: 'Gotham',
  },
  {
    id: '4',
    email: 'emily.jones@example.com',
    name: 'Emily Jones',
    password: 'securepassword4',
    address: '321 Pine St, Star City',
    phone: '444-444-4444',
    country: undefined,
    city: 'Star City',
  },
  {
    id: '5',
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
  async getUsers() {
    return await users;
  }
}
