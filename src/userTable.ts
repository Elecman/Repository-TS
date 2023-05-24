import { ColumnsType } from "antd/es/table";
import { TUserFragment } from "./Scheme/UserScheme";

export const userTable: ColumnsType<TUserFragment> = [
  {
    title: "Login",
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
        title: "username",
        render: (_, value) => value.username
      },
      {
        title: "password",
        render: (_, value) => value.password
      }
    ]
  }
];
