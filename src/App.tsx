import './App.css';
import { Center, Tabs } from '@chakra-ui/react';
import { StateManagers } from '@/constants/state-managers.ts';
import { NavLink, Outlet, useLocation } from 'react-router';

function App() {
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
      <Center bg="bg.emphasized" h="90vh" w="100vw">
        <Outlet />
      </Center>
    </>
  );
}

export default App;
