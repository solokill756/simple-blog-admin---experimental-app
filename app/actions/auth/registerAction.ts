import { registerState } from '@/app/lib/type/actionType';
import bcrypt from 'bcryptjs';
import z from 'zod';

const RegisterSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('email is not valid'),
    password: z.string().min(6, 'password is too short'),
    confirmPassword: z.string().min(6, 'confirm password is too short'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
  });

export async function registerAction(
  prevState: registerState,
  formData: FormData
) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };
  const validationResult = RegisterSchema.safeParse(rawData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: 'Validation failed',
    };
  }
  try {
    const { name, email, password } = validationResult.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_MOCK_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        password: hashedPassword,
        role: 'user',
      }),
    });
    if (!res.ok) {
      return {
        message: 'Failed to register user',
        errors: {},
      };
    }
    return {
      message: '',
      errors: {},
    };
  } catch (error) {
    const getErrorMessage =
      error instanceof Error ? error.message : String(error);
    return {
      message: getErrorMessage,
      errors: {},
    };
  }
}
