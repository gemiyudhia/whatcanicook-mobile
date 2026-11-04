import { z } from 'zod';

const emailField = z
  .string()
  .trim()
  .min(1, 'Email wajib diisi')
  .email('Format email tidak valid');

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, 'Kata sandi wajib diisi'),
});

export const registerSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, 'Nama minimal 2 karakter')
    .max(60, 'Nama maksimal 60 karakter'),
  email: emailField,
  password: z
    .string()
    .min(8, 'Kata sandi minimal 8 karakter')
    .regex(/\d/, 'Kata sandi harus mengandung angka'),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
