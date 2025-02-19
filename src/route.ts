import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());


export default app;

