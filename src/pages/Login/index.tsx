import { Button, Card, Center, Field, Input, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
import { useAuthContext } from '@/features/AuthContext.tsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const loginScheme = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required()
});
interface FormValues {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<FormValues>({
    resolver: yupResolver(loginScheme)
  });
  const { initialRoute } = useAuthContext();
  const { isAuthenticated, login } = useAuthContext();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const { status } = await login(data.email, data.password);
      if (status === 401) {
        setError('root', { message: 'Неверный логин или пароль' });
      }
    } catch (error) {
      console.log(error);
    }
  });
  useEffect(() => {
    if (isAuthenticated) {
      navigate(initialRoute);
    }
  }, [isAuthenticated, navigate, initialRoute]);

  return (
    <Center bg="bg.emphasized" h="100vh" w="100vw">
      <Card.Root>
        <form onSubmit={onSubmit}>
          <Card.Header>
            <Card.Title>Sing up</Card.Title>
            <Card.Description>
              Fill in the form below to create an account
            </Card.Description>
          </Card.Header>
          <Card.Body gap={'4'}>
            <Field.Root invalid={!!errors.email}>
              <Field.Label>Email</Field.Label>
              <Input {...register('email')} />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.password}>
              <Field.Label>Password</Field.Label>
              <Input {...register('password')} />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>
            <Text style={{ color: 'red' }}>{errors.root?.message}</Text>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button
              onClick={() => {
                reset();
              }}
              variant="outline"
              type={'reset'}
            >
              Cancel
            </Button>
            <Button variant="solid" type={'submit'}>
              Sign in
            </Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </Center>
  );
};
