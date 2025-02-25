import './App.css'
import { Center,  Tabs} from "@chakra-ui/react";

function App() {

  return (
    <>
    <Center bg="bg.emphasized" h="10vh" w="100vw">
<Tabs.Root variant={'enclosed'}>
            <Tabs.List>
                <Tabs.Trigger value={'Tabs1'}>Tab1</Tabs.Trigger>
                <Tabs.Trigger value={'Tabs2'}>Tab2</Tabs.Trigger>
                <Tabs.Trigger value={'Tabs3'}>Tab3</Tabs.Trigger>
                <Tabs.Trigger value={'Tabs4'}>Tab4</Tabs.Trigger>
                <Tabs.Trigger value={'Tabs5'}>Tab5</Tabs.Trigger>
            </Tabs.List>
        </Tabs.Root>
    </Center>
    <Center bg="bg.emphasized" h="90vh" w="100vw">
        

    </Center></>
  )
}

export default App
