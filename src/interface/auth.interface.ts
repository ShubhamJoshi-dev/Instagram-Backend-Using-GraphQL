export interface IAuthCreate {
  name: string;
  email: string;
  password: string;
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
