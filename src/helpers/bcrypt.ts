import * as bcrypt from 'bcrypt';
export async function generateHash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function checkPassword(
  oldPassword: string,
  newPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(oldPassword, newPassword);
}
