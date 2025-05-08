import './index.css';
import { Box, Tabs, Center } from '@chakra-ui/react';
import { StateManagers } from '@/shared/constants/state-managers.ts';
import { NavLink, Outlet, useLocation } from 'react-router';

export function RoutingLayout() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <Center bg="bg.emphasized" h="10vh" w="100vw">
        <Tabs.Root variant={'enclosed'} value={location.pathname.slice(1)}>
          <Tabs.List>
            {StateManagers.map(({ name, disabled }) => (
              <Tabs.Trigger
                key={name}
                disabled={disabled}
                value={name.toLowerCase()}
              >
                <NavLink
                  style={{
                    pointerEvents: disabled ? 'none' : 'auto'
                  }}
                  to={`/${name.toLowerCase()}`}
                >
                  {name}
                </NavLink>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
      </Center>
      <Box padding={'20px'} bg="bg.emphasized" h="calc(90vh)" w="calc(100vw)">
        <Outlet />
      </Box>
    </>
  );
}
