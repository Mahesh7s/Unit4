export enum Rating {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  date?: string;
  foodRating: Rating;
  serviceRating: Rating;
  cleanlinessRating: Rating;
  comments?: string;
}
