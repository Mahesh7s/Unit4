// App.jsx
import { Box, Flex } from '@chakra-ui/react'
import CardComponent from './CardComponent'

function App() {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.100" p={4}>
      <CardComponent />
    </Flex>
  )
}

export default App
