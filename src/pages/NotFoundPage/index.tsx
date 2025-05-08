import { Button, Heading, VStack } from '@chakra-ui/react';
import { PageOutletLayout } from '@/shared/ui/PageOutletLayout';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <PageOutletLayout>
      <VStack>
        <Heading>Page Not Found</Heading>
        <Button onClick={() => navigate('/')}>
          <IoIosArrowRoundBack />
          Back
        </Button>
      </VStack>
    </PageOutletLayout>
  );
};
