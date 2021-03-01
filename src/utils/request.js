import axois from "axios";
// import getParams from "./params";

let websiteServerURL = 'https://game.itaotuo.com/website-server',
  puzzleServerURL = 'https://game.itaotuo.com/puzzle-manager'
// switch (getParams("env")) {
//   case "debug":
//     websiteServerURL = "http://localhost:3101"
//     puzzleServerURL = "http://localhost:3304"
//     break;
//   case "test":
//     websiteServerURL = "https://t1.itaotuo.com/website-server"
//     puzzleServerURL = "https://t1.itaotuo.com/puzzle"
//     break;
//   default:
//     websiteServerURL = "https://game.itaotuo.com/website-server"
//     puzzleServerURL = "https://game.itaotuo.com/puzzle-manager"
// }

const websiteService = axois.create({
  baseURL: websiteServerURL,
  timeout: 5000
});

websiteService.interceptors.response.use(
  response => response.data,
  error => {
    console.log("出错了：", error);
    return Promise.reject(error);
  }
);

const puzzleService = axois.create({
  baseURL: puzzleServerURL,
  timeout: 5000
});

puzzleService.interceptors.response.use(
  response => response.data,
  error => {
    console.log("出错了：", error);
    return Promise.reject(error);
  }
);

export {
  puzzleService,
  websiteService
}
