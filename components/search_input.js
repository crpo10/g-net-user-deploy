import { Container, Box, Input, InputGroup, InputRightAddon, Stack, Button, Link, Flex, Center, IconButton } from "@chakra-ui/react";
import axios, { Axios } from "axios";
import { useEffect, useState, useRef } from "react";
import { EditIcon } from '@chakra-ui/icons';



const ListItem = ({ name,telf, parroquia, sector , email }) => {
  return (
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' mt={4}> 
      <Stack
        direction={{base: 'row',md:"row"}}
        width={{base:"full",md:'auto'}}
        alignItems='center'
        flexGrow={1}
      >
      <Box
      ml={4}
      mt='1'
      fontWeight='semibold'
      as='h3'
      lineHeight='tight'
      isTruncated>
        {name}
      </Box>
      <Box
        paddingRight={4}
        ml={4}
        flex={1}
        align="right"
        mt='1'
        fontWeight='semibold'
        as='h3'
        lineHeight='tight'
        isTruncated>
        {telf}
      </Box>
      <Box p={1}>
        <Link href="/edit">
          <IconButton backgroundColor='black'  icon={<EditIcon/>}></IconButton>
        </Link>
      </Box>
      </Stack>
      <Box
        ml={4}
        pb={2}
        color='gray.500'
        fontWeight='semibold'
        // letterSpacing='normal'
        fontSize='s'>
        {email}
      </Box>
      <Box
        ml={4}
        pb={2}
        color='gray.500'
        fontWeight='semibold'
        // letterSpacing='normal'
        fontSize='xs'>
        {` ${ parroquia } - ${ sector } `}
      </Box>
    </Box>
  )

}



const SearchContainer = (props) => {


  const [total, setTotal] = useState([]);
  const [user, setUser] = useState([]);
  const [query, setQuery] = useState('');
  const searchInput = useRef(null);

  const getTotalUserData = async () => {
  
    const _url = 'https://gnetwork.gonavi.dev/user/';

    await axios.get(_url).then((value)=>{
  
      setUser(value.data.results)
      setTotal(value.data)
    })
  }

  const getSearchUser =  () => {
    
    
    setTimeout(async ()  => {
      console.log('hola')
      let _url = `https://gnetwork.gonavi.dev/user?search=${query}`;
      
        await axios.get(_url).then( (value) => { 
  
          setUser(value.data.results)
          setTotal(value.data)
    
        })      
    }, 500);


  }
  
  useEffect(() => {
    getTotalUserData()
    searchInput.current.focus();
  },[]);

  useEffect(() => {
    getSearchUser()
  },[query]);

  
  

  return (
    <Container >
      <InputGroup>
      <Input ref={searchInput} placeholder="Buscar Cliente" onChange={ (query) => {setQuery(query.target.value)}}/>
      <InputRightAddon children={`Total ${ total.count == null ? '0': total.count } `} backgroundColor='black'/>
      </InputGroup>
      { user.map((item, key ) => (


        <ListItem key={key} name={item.name} parroquia={item.parroquia} sector={item.sector} telf={item.phone} email={item.email}/>


      )) }
      <Container maxW='container.md'>
        <Center>
          <Link href="/">
            <Button mt={4} backgroundColor='blue.400' size='md' width='200px'> Buscar</Button>
          </Link>
        </Center>
      </Container>
    </Container>
  )
}



export default SearchContainer;


