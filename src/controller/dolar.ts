import { Request, Response } from 'express';
import { errorQuery } from '../util/errors';
import { getDolarQuery } from '../query/dolarQuery';

export const getDolar = async (_req: Request, res: Response) => {
  try {
    const dolar = await getDolarQuery();
    return res.json({ dolar });
  } catch (error) {
    errorQuery(res, error);
  }
};
