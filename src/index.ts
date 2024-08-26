import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import { AppDataSource } from './typeorm.config';
import { authMiddleware } from './middleware/authentication';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    const publicRoutes = [/^\/api\/v1\/auth(\/.*)?$/];
    if (publicRoutes.some(route => route.test(req.path))) {
        return next();
    }

    authMiddleware(req, res, next);
});


app.use('/api/v1/', routes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

AppDataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http:localhost:${port}`);
        });
    }).catch((err) => {
        console.log(`Error with connecting to database: ${err}`);
    });

export default app;