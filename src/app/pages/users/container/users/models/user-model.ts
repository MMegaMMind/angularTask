export interface UserModel {
  id: number;
  email: string;
  name: string;
  password: string;
  imageUrl: string;
  role?: number;
}
