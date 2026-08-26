export interface PersonModel {
  fullName: string;
  emailAddress: string;
  password: string;
  gender: Gender;
  city: City;
  acceptRules: boolean;
  description?: string;
  avatar?: string; // ← اضافه شد
}

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export enum City {
  Tehran = 'tehran',
  Isfahan = 'isfahan',
  Shiraz = 'shiraz',
  Mashhad = 'mashhad',
  Yazd = 'yazd',
}

export const emptyPerson: PersonModel = {
  fullName: '',
  emailAddress: '',
  password: '',
  gender: Gender.Male,
  city: City.Tehran,
  acceptRules: false,
  description: '',
  avatar: '', // ← اضافه شد
};

export const cityList: { value: City; label: string }[] = [
  { value: City.Tehran, label: 'تهران' },
  { value: City.Isfahan, label: 'اصفهان' },
  { value: City.Shiraz, label: 'شیراز' },
  { value: City.Mashhad, label: 'مشهد' },
  { value: City.Yazd, label: 'یزد' },
];
