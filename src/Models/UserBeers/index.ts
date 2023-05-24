import { TUserFragment } from "../../Scheme/UserScheme";
import { TUserBeerFragment } from "../../Scheme/UserBeerScheme";

export type TUserBeersModel = {
  [key: TUserFragment["uid"]]: TUserBeerFragment
}

