import { z } from 'zod';

const phoneRegex = /^\d{7,15}$/;

export const authSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Ingresa tu e-mail o teléfono')
    .refine((val) => {
      // Check if it's a valid email
      const emailResult = z.string().email().safeParse(val);
      if (emailResult.success) return true;

      // Check if it's a valid phone number (digits only, 7-15 chars)
      return phoneRegex.test(val);
    }, 'Revisa tu e-mail o teléfono'),
  firstName: z.string().min(1, 'Ingresa tu nombre'),
  lastName: z.string().min(1, 'Ingresa tu apellido'),
});

export type AuthFormData = z.infer<typeof authSchema>;
