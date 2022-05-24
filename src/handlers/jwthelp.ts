import { Request } from 'express';
import { verify, JwtPayload, sign } from 'jsonwebtoken';
const st = process.env.secret_t as unknown as string;

export function vf(req: Request, userId?: number) {
  const ah = req.headers.authorization;
  const tk: string = ah!.split(' ')[1];
  const decod = verify(tk, st) as JwtPayload;
  if (userId && decod.user.userId != userId) {
    Error('user id not this');
  }
}

export function sg(userId: number) {
  return sign({ user: { userId } }, st);
}
