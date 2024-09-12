export class CreateUserDto {
  username: string;
  password: string;
  roleId: number;
  nickName?: string;
  avatar?: string;
  email?: string;
  roles?: string;
}
