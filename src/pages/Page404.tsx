import { Button, Heading, VStack } from '@chakra-ui/react';
import { PageLayout } from '@/entities/PageLayout.tsx';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router';

export const Page404 = () => {
  const navigate = useNavigate();
  return (
    <PageLayout>
      <VStack>
        <Heading>Page Not Found</Heading>
        <Button onClick={() => navigate('/')}>
          <IoIosArrowRoundBack />
          Back
        </Button>
      </VStack>
    </PageLayout>
  );
};
