import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router";
import { UserPage } from "../../Pages/Users";
import { BeersPage } from "../../Pages/Beers";
import { UserBeersPage } from "../../Pages/UserBeers";

export const RoutesContainer = observer(() => {
  return (
    <Routes>
      <Route path="/" element={<UserPage />} />
      <Route path="/beers" element={<BeersPage />} />
      <Route path="/usersBeers" element={<UserBeersPage />} />
      <Route path="*" element={<UserPage />} />
    </Routes>
  );
});
