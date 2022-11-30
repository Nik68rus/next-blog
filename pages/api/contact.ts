import type { IMessageBody } from './../../types/index';
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { isEmail } from '../../helpers/validator';
import { resolveSoa } from 'dns';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IMessageBody;
}

type Data = {
  message?: string;
  id?: string;
};

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (!isEmail(email) || name.trim() === '' || message.trim() === '') {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    const newMessage: IMessageBody = { email, name, message };

    let client;

    try {
      client = await MongoClient.connect(process.env.MONGO_URI);
    } catch (err) {
      return res.status(500).json({ message: 'Database connection failed!' });
    }

    const db = client.db();

    try {
      const message = await db.collection('messages').insertOne(newMessage);
      res
        .status(210)
        .json({ message: 'Succeed!', id: message.insertedId.toString() });
    } catch (err) {
      res.status(500).json({ message: 'Database insert error!' });
    } finally {
      client.close();
    }
  }
}
