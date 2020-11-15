import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import path from 'path';
import { User } from './entities/User';
import argon2 from 'argon2';
import { sign } from 'jsonwebtoken';
import { sendEmail } from './utils/sendEmail';

const app = express();

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: 'postgresql://postgres:2606@localhost:5432/t-project',
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [User]
  });
  await conn.runMigrations();

  app.use(bodyParser.json());

  app.post('/signup', async (req: Request, res: Response) => {
    const { username, password, doctorId } = req.body;
    const hashedPassword = await argon2.hash(password);
    const user = await User.create({
      username,
      password: hashedPassword,
      doctorId
    }).save();
    const token = sign({ id: user.id }, 'sdadad');
    res.send({ token });
  });
  app.post('/sendhelp', (req: Request, res: Response) => {
    const { latitude, longitude } = req.body;
    sendEmail(longitude, latitude);
    res.send(true);
  });
  app.post('/signin', async (req: Request, res: Response) => {
    const { username, password, doctorId } = req.body;
    const user = await User.findOne({
      username,
      doctorId
    });
    if (!user) {
      return res.status(400).send('Wrong credential');
    }
    const correctPassword = await argon2.verify(user.password, password);
    if (!correctPassword) {
      return res.status(400).send('Wrong credential');
    }
    const token = sign({ id: user.id }, 'sdadad');
    return res.send({ token, user });
  });
  app.listen(5000);
};

main();
