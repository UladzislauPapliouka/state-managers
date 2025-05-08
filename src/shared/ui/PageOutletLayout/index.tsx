import { Center, CenterProps } from '@chakra-ui/react';

export const PageOutletLayout = (props: CenterProps) => {
  return (
    <Center
      background={'bg.muted'}
      style={{ borderRadius: '20px' }}
      width={'100%'}
      height={'100%'}
      {...props}
    />
  );
};
