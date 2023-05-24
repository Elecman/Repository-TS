import { observer } from "mobx-react-lite";
import React from "react";
import { Layout, Menu } from "antd";
import { RoutesContainer } from "../RoutesContainer";
import { useMatch, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

const routes = [
  {
    key: '0',
    path: "/",
    label: "users"
  },
  {
    key: '1',
    path: "/beers",
    label: "beers"
  },
  {
    key: '2',
    path: "/usersBeers",
    label: "usersBeers"
  }
];

export const PageContainer = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const match = useMatch(location.pathname);
  const matchIdx = routes.find(r => r.path === match?.pathname);

  return (
    <Layout>
      <Layout.Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[matchIdx?.key ?? '0']}
          items={routes.map((value, index) => {
            return {
              key: index,
              label: `${value.label}`
            };
          })}
          onClick={(props) => {
            if (props.key) {
              navigate(routes?.[props.key as unknown as number].path);
            }
          }}
        />
      </Layout.Header>
      <Layout.Content style={{ padding: "16px 16px" }}>
        <RoutesContainer />
      </Layout.Content>
    </Layout>
  );
});
