import controllers from "./controllers"

export default (plugin) => {
  // plugin.routes["content-api"].routes = plugin.routes["content-api"].routes.map(
  //   (item) => {
  //     if (item.method == "POST" && item.path == "/auth/local/register") {
  //       item.config.middlewares = [
  //         "global::create-user-profile",
  //       ];
  //     }

  //     return item;
  //   }
  // );
  plugin.controllers = controllers;
  return plugin;
};