export interface IAuthCreate {
  name: string;
  email: string;
  password: string;
}

export interface IUser extends IAuthCreate {}

export interface IUserProfile {
  userProfileName: string;
  primaryEmail: string;
  secondaryEmail: string;
  phoneNumber: string;
  isDeleted: boolean;
  isDeactivated: boolean;
}
export interface IAuthLogin {
  name: string;
  password: string;
}

export interface IDecodedPayload {
  name: string;
  email: string;
  userId: string;
  iat: number;
  exp: number;
  iss: string;
}
