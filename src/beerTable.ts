import { ColumnsType } from "antd/es/table";
import { TBeerFragment } from "./Scheme/BeerScheme";

export const beerTable: ColumnsType<TBeerFragment> = [
  {
    title: "Beers",
    children: [
      {
        title: "id",
        render: (_, value) => value.id,
        width: 0,
      },
      {
        title: "uid",
        render: (_, value) => value.uid,
        width: '20%',
      },
      {
        title: "name",
        render: (_, value) => value.name
      },
      {
        title: "brand",
        render: (_, value) => value.brand
      }
    ]
  }
];
