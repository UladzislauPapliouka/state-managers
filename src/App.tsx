import './App.css';
import { Center, Tabs } from '@chakra-ui/react';

const tabs = [
  {
    name: 'Redux',
    disabled: false
  },
  {
    name: 'MobX',
    disabled: true
  },
  {
    name: 'Zustand',
    disabled: true
  }
];
function App() {
  return (
    <>
      <Center bg="bg.emphasized" h="10vh" w="100vw">
        <Tabs.Root variant={'enclosed'}>
          <Tabs.List>
            {tabs.map(({ name, disabled }) => (
              <Tabs.Trigger key={name} disabled={disabled} value={name}>
                {name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
      </Center>
      <Center bg="bg.emphasized" h="90vh" w="100vw"></Center>
    </>
  );
}

export default App;
