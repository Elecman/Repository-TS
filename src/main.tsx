import React from "react";
import ReactDOM from "react-dom/client";
import { StoreProvider } from "./Containers/Store";
import "moment/locale/ru";
import moment from "moment/moment";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import ruRU from "antd/es/locale/ru_RU";
import { PageContainer } from "./Containers/PageContainer";
import { BrowserRouter } from "react-router-dom";

moment.locale("ru");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider locale={ruRU}>
    <BrowserRouter>
      <StoreProvider>
        <PageContainer />
      </StoreProvider>
    </BrowserRouter>
  </ConfigProvider>
);
