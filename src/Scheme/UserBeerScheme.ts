import { TBeerModel } from "../Models/Beer";
import { TUserModel } from "../Models/User";
import { TUserFragment } from "./UserScheme";
import { TBeerFragment } from "./BeerScheme";

export type TUserBeersScheme = {
  users: TUserModel
  beers: TBeerModel
}

export type TUserBeerFragment = TUserFragment & {beer: TBeerFragment['name'], beerUid: TBeerFragment['uid']}
