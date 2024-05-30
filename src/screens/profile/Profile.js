import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, Link, Container, useSafeArea } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Profile = () => {
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")
  
  useEffect(() => {
    setName(AsyncStorage.getItem('name'))
    setEmail(AsyncStorage.getItem('email'))
    setPhoneNumber(AsyncStorage.getItem('phoneNumber'))
  }, [])


    return(
    <NativeBaseProvider>
        <Container flex={1} px="3">

   <Container w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Profile
        </Heading>
        <Heading mt="1" color="coolGray.400" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          user details
        </Heading>
        <VStack space={3} mt="5">
        <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input  value={name}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input  value={email}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Phone Number</FormControl.Label>
            <Input type="password" value={phoneNumber}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Status</FormControl.Label>
            <Input type="text" value="active" />
          </FormControl>
          {/*<Button mt="2" colorScheme="indigo">
            Sign up 2
          </Button>*/}
        </VStack>
        {/*<Link href="/signup" mt="2" colorScheme="indigo">
            Login
        </Link>*/}
      </Box>
    </Container>
    </Container>
    </NativeBaseProvider>
)}
    