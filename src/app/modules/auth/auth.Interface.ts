export type IUser = {
  token?: string | undefined;
  refreshToken?: string | undefined;
};

export type ICreateUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  contactNo: string;
  address: string;
  profileImg: string;
};
