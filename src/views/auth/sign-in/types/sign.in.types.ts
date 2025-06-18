export type TSignInRequest = {
  email?: string
  username: string
  password: string
}

export type TSignInResponse = {
  success: boolean;
  message: string;
  data: {
    authenticatedUser?: {
      id: number,
      username: string,
      designation: string,
      email: string,
      userProfileId: number,
      languageId: number,
      imagePath: null,
      passwordExpirationCriterio: null,
      isPosSupervisor: boolean,
    };
    token: string;
    message: string;
    success: boolean;
  }
}