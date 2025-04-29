import { Button, Card, Center, Field, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

const loginScheme = yup.object().shape({
  email: yup.string().email().required(),
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
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(loginScheme)
  });

  const onSubmit = handleSubmit((data) => console.log(data));

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
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline" type={'reset'}>
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
