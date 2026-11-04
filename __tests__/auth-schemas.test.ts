import { loginSchema, registerSchema } from '../src/lib/auth-schemas';

const validRegister = {
  displayName: 'Nisa Pratiwi',
  email: 'nisa@email.com',
  password: 'rahasia123',
};

const firstError = (result: {
  success: boolean;
  error?: { issues: { message: string }[] };
}) => result.error?.issues[0].message;

describe('loginSchema', () => {
  it('accepts a valid email and a password', () => {
    expect(
      loginSchema.safeParse({ email: 'nisa@email.com', password: 'x' }).success,
    ).toBe(true);
  });

  it('requires an email and a password', () => {
    expect(
      firstError(loginSchema.safeParse({ email: '', password: 'x' })),
    ).toBe('Email wajib diisi');
    expect(
      firstError(
        loginSchema.safeParse({ email: 'nisa@email.com', password: '' }),
      ),
    ).toBe('Kata sandi wajib diisi');
  });

  it('rejects an invalid email format', () => {
    expect(
      firstError(loginSchema.safeParse({ email: 'nisa@', password: 'x' })),
    ).toBe('Format email tidak valid');
  });
});

describe('registerSchema', () => {
  it('accepts valid input and trims the name and email', () => {
    const result = registerSchema.safeParse({
      ...validRegister,
      displayName: '  Nisa  ',
      email: ' nisa@email.com ',
    });

    expect(result.success).toBe(true);
    expect(result.data?.displayName).toBe('Nisa');
    expect(result.data?.email).toBe('nisa@email.com');
  });

  it('rejects a password shorter than 8 characters', () => {
    expect(
      firstError(
        registerSchema.safeParse({ ...validRegister, password: 'abc123' }),
      ),
    ).toBe('Kata sandi minimal 8 karakter');
  });

  it('rejects a password without a digit', () => {
    expect(
      firstError(
        registerSchema.safeParse({ ...validRegister, password: 'abcdefghi' }),
      ),
    ).toBe('Kata sandi harus mengandung angka');
  });

  it('rejects a name shorter than 2 characters', () => {
    expect(
      firstError(
        registerSchema.safeParse({ ...validRegister, displayName: 'N' }),
      ),
    ).toBe('Nama minimal 2 karakter');
  });
});
