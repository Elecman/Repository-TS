import { TUserFragment } from "../../Scheme/UserScheme";

export type TUserModel = {
  [key: TUserFragment['uid']]: TUserFragment
}
