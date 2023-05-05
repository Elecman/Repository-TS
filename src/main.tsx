import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StoreProvider } from "./Containers/Store";
import 'moment/locale/ru';
import moment from "moment/moment";
import { ConfigProvider } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';

moment.locale('ru')
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider locale={ruRU}><StoreProvider><App /></StoreProvider></ConfigProvider>
);
