const jsonServer = require("json-server");
const server = jsonServer.create();

const data = require("./data/comments.json");

const router = jsonServer.router({ comments: data });
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3200;

server.use(middlewares);
server.use(router);

server.listen(port);
