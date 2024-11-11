import express from "express";
import cors from "cors";

const expressApp = express();

const limit = '30mb';

expressApp.use(express.urlencoded({ 'extended': true, 'limit': limit }));
expressApp.use(express.json({ 'limit': limit }));
expressApp.use(express.static('public', { 'extensions': ['html', 'htm'] }));
expressApp.use(cors());

export class APPLICATION_PROVIDER {
    static application = { expressApp };
}