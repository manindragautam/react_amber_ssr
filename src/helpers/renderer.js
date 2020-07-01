import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import Routes from "../Routes";
import fs from "fs";

const readFile = (path, opts = "utf8") =>
  new Promise((resolve, reject) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const generateHtml = async () => {
  const indexFile = path.resolve("src/views/home/index.html.ecr");
  const res = await readFile(indexFile);
  return res;
};

export default (path, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={path}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  const htmlContent = generateHtml(content).then((data) => {
    data = data.replace(
      '<div id="root"></div>',
      `<div id="root">${content}</div>`
    );
    return data;
  });

  return htmlContent;
};
