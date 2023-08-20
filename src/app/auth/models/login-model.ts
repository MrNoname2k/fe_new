/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClientResponse } from '../../core/models/http-response';

/* eslint-disable @typescript-eslint/naming-convention */
export interface LoginModelResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface LoginModelRequest {
  mail: string;
  password: string;
}

export interface UserLogin {
  mail: string;
  password: string;
}

export interface MetaModel {
  code: string;
  field: string | null;
  message: string;
}

export interface RoleModel {
  role: string,
}

export interface DataUserLoginModel {
  roles: Array<RoleModel>,
  delFlg: string,
  createBy: string,
  userId: number,
  userName: string,
  mail: string,
  phone: string,
  lockUser: number | null
}

export interface HttpClienUserLogintResponse extends HttpClientResponse {
  data: DataUserLoginModel;
}



