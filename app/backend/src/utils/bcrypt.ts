import * as bcrypt from 'bcryptjs';

const hash = async (password: string) => bcrypt.hash(password, 10);
const compare = async (password: string, passHashe: string) => bcrypt.compare(password, passHashe);

export { hash, compare };
