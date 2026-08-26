import { PersonModel } from './person-model';

export interface PersonResponse extends PersonModel {
  id: string;
  createdAt?: string;
}
