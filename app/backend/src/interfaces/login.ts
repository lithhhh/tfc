export interface ILogin {
  email: string
  password: string
}

export interface IJwtPayload {
  id: number,
  username: string,
  role: string,
  email: string
}

export interface Authorization {
  authorization: string
}

export interface IId {
  id: number
  role: string
  email: string
  username: string
}
