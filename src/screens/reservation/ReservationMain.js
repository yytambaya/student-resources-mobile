import {useEffect, useLayoutEffect, useState} from 'react' 
// import Profile from './Profile'
//import NewLit from './NewLit'
import Lits from './Reservations'
import EditLit from './EditReservation'
import { getSiteBaseURL } from '../../utils/helpers'
import logo1 from '../../asset/images/logo1.svg' 
import reservationPic from '../../asset/images/user.svg';
import EditReservation from './EditReservation'
import Reservations from './Reservations'
import NewReservation from './NewReservation'
import Reservation from './Reservation'
import { Navbar } from '../components/Navbar'

const ReservationMain = () => {
    const [page, setPage] = useState("Reservations")
    const [lastPage, setLastPage] = useState("Reservations")
    const [reservation, setReservation] = useState({})
    
    
    useLayoutEffect( () => {
        if(localStorage.getItem('jwt_token') == "" || localStorage.getItem('jwt_token') == null || localStorage.getItem('jwt_token') == undefined){
            window.location.href = `${getSiteBaseURL()}/login`
        }
    }, [])
    
    
    
    return(
        <NativeBaseProvider>
        <Container flex={1} px="3">
          {page == "Reservations" ? <Reservations setPage={setPage} setLastPage={setLastPage} lastPage={lastPage} setReservation={setReservation} /> : <Reservation reservation={reservation} setPage={setPage} setLastPage={setLastPage} lastPage={lastPage}/> } 
        </Container>
        </NativeBaseProvider>
    )
}

export default ReservationMain