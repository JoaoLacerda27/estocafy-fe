import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LoginLayout from '../../layouts/LoginLayout';
import { BaseInput } from '../../components-base';
import { AuthService } from '../../service/AuthService';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('Senha obrigatória'),
});

type LoginForm = yup.InferType<typeof schema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    
    setFormError(null);
    try {
      await AuthService.login(data);
      navigate('/');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        // @ts-expect-error: response is not guaranteed, but we check for it
        setFormError(err.response?.data?.message || 'Erro ao fazer login.');
      } else {
        setFormError('Erro ao fazer login.');
      }
    }
  };

  return (
    <LoginLayout>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: 380 }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: 32, fontWeight: 700, fontSize: 28 }}>Acesse sua conta</h2>
        {formError && (
          <div style={{ color: 'var(--error)', marginBottom: 16, fontWeight: 500 }}>{formError}</div>
        )}
        <BaseInput
          label="E-mail"
          type="email"
          placeholder="Digite seu e-mail"
          register={register('email')}
          error={errors.email}
          autoComplete="username"
        />
        <div style={{ height: 18 }} />
        <BaseInput
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          register={register('password')}
          error={errors.password}
          autoComplete="current-password"
        />
        <div style={{ height: 32 }} />
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '14px 0',
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 18,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </LoginLayout>
  );
} 