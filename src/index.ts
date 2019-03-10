import dotenv from "dotenv";
dotenv.config();
import {Options} from "graphql-yoga";
import{createConnection}from"typeorm";
import connectionOptions from"./ormConfig";
import app from "./app";

const PORT : number | string = process.env.PORT || 4000;
const PLAYGROUND : string = "/playground";
const GRAPHQL_ENDPOINT : string = "/graphql";

const appOptions : Options = {
  port: PORT,
  playground : PLAYGROUND,
  endpoint : GRAPHQL_ENDPOINT
}

const handleAppStrt = () => {
  console.log(`Listening on port ${PORT}` );
}

createConnection(connectionOptions).then(()=>{
    app.start(appOptions,handleAppStrt);
}).catch(error=>console.log(error));
