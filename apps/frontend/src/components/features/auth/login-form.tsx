'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthFormData, authSchema } from '@/core/domain/auth.schema';
import { useAuth } from '@/core/contexts/auth.context';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';

export const LoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    login(data);
    router.push(returnUrl);
  };

  return (
    <div className="w-full max-w-[36rem] rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
      <h1 className="mb-8 text-2xl font-semibold text-gray-900">
        Ingresa tu e-mail o teléfono para iniciar sesión
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="md:space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="identifier"
            className="text-sm font-medium text-gray-900"
          >
            Correo o teléfono
          </label>
          <Input
            id="identifier"
            type="text"
            className={`h-12 w-full rounded-md border ${errors.identifier ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            {...register('identifier')}
          />
          {errors.identifier && (
            <p className="text-xs text-red-500">{errors.identifier.message}</p>
          )}
        </div>

        <div className="md:flex md:justify-between w-full md:gap-4">
          <div className="space-y-1">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-900"
            >
              Nombre
            </label>
            <Input
              id="firstName"
              type="text"
              className={`h-12 w-full rounded-md border ${errors.firstName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-900"
            >
              Apellido
            </label>
            <Input
              id="lastName"
              type="text"
              className={`h-12 w-full rounded-md border ${errors.lastName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="h-12 w-full bg-[#3483fa] text-base font-medium hover:bg-[#2968c8]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cargando...' : 'Continuar'}
          </Button>
        </div>
      </form>
    </div>
  );
};
