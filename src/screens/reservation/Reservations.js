import {useState, useEffect} from 'react'
import { getAPIBaseURL } from "../../utils/helpers";
import { getData } from "../../utils/request";
import { validateTitle, validateText } from "../../services/validators";

const Reservations = ({setPage, setLastPage, setReservation}) => {
    const [lits, setLits] = useState([]);
    const [parks, setParks] = useState([])
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [publish, setPublish] = useState("0")
    const [author, setAuthor] = useState("")
    const [limit, setLimit] = useState("10")
    const [skip, setSkip] = useState("0")
    const [bottomLoading, setBottomLoading] = useState(false);
    const [pageEnd, setPageEnd] = useState(false);
    const [error, setError] = useState([{field: "title", msg:""}, {field: "text", msg:""}]);
    const [genError, setGenError] = useState("")

    useEffect( () => {
        getReservations()
    }, [skip])

    window.onscroll = (e) => handleScroll(e);

    const handleScroll = (e) => {
      
      if(window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight){
        //alert("Reached end")
        
        setSkip(lits?.length)
        //console.log("At the bottom")
        //fetchMoreData(); 
        //alert("Fetch next 10")
      }
    }
    
  


    const getReservations = async () => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        var accessToken = localStorage.getItem('jwt_token');
        var at_val = accessToken == "" || accessToken == undefined? false : true; 
        if(accessToken == "") setGenError("Unauthorized park. Login again!"); 
        
        if(at_val){
            //alert("going")
            const url = `${getAPIBaseURL()}/v1/admin/park/getall`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            const params = {limit:limit , skip:skip};

            const request = await getData(url, headers, params)
            //alert(JSON.stringify(request))
            if(request.error == ""){
                if(request.result.data.error == ""){
                    //alert(JSON.stringify(request.result.data.result))
                    if(request.result.data.result.length == 0){
                        setPageEnd(true)
                        setBottomLoading(false)
                    }else{
                        setParks([...lits, ...request.result.data.result])
                    }
                    //window.location.href = `${getAPIBaseURL()}/app`

                }else{
                    //alert("Eror")
                    setGenError(request.result.data.result)
                }

            }else{
                setGenError("Something went wrong")
            }
            
        }  
    }

    const changePage = (reservation) => {
        setReservation(reservation)
        setPage("Reservation")
        setLastPage("Reservations")
    }


    return(

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
            <FormControl.Label>Email</FormControl.Label>
            <Input  value="yytambaya@gmail.com"/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Phone Number</FormControl.Label>
            <Input type="password" value="09054762388"/>
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
    
    )
}

export default Reservations;