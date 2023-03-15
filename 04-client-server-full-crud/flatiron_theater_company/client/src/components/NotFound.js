import { Link } from 'react-router-dom'
import styled from 'styled-components'

function NotFound(){
    return(
        <>
            <H1>Sorry We can't find the Page you're looking for!</H1>
            <H1>404 Not Found</H1>
            <Link to="/" style={{textDecoration: "none"}}><H1 style={{color: "#663399"}}>Go Home</H1></Link>
        </>
    )
}
export default NotFound

const H1 = styled.h1`
    color: pink;
    font-family: "Poppins", "sans-serif";
`