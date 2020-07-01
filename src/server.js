import express from "express";
import { matchRoutes } from "react-router-config";
import Routes from "./Routes";
import renderer from "./helpers/renderer";
import createStore from "./store";

const store = createStore();
const { dispatch } = store;
const routes = matchRoutes(Routes, "_PATH");
const promises = routes.map(({ route }) =>
  route.loadData ? route.loadData(dispatch) : null
);

Promise.all(promises).then(() => {
  const content = renderer("_PATH", store).then((data) => {
    toCrystal(data);
  });
});
