import { TBeerFragment } from "../../Scheme/BeerScheme";

export type TBeerModel = {
  [key: TBeerFragment["uid"]]: TBeerFragment
}
