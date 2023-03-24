import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { GiHamburgerMenu } from 'react-icons/gi'

function Navigation({user, updateUser}) {
 const [menu, setMenu] = useState(false)

 const history = useHistory()

 const closeStyles = {
  marginBottom: 4,
  border: "1.5px solid pink",
  borderRadius: 3,
  width: 14,
  textAlign: "center",
  cursor: "pointer",
};

const handleLogOut = () => {
  // DELETE '/logout'
  fetch('/logout', {
    method: "DELETE"
  })
  .then(r => {
    if(r.ok) {
      updateUser(null)
      history.push("/login")
    }
  })
}
  
    return (
        <Nav> 
         <NavLink to="/">
        <h1>Flatiron Theater Company</h1>
      </NavLink>
         <Menu>
        {user ? <button onClick={handleLogOut}>Log Out</button> : null}
           {!menu?
           <div onClick={() => setMenu(!menu)}>
             <GiHamburgerMenu size={30}/> 
           </div>:
           <ul>
            <li onClick={() => setMenu(!menu)} style={closeStyles}>x</li>
           {user && <li><Link to={`/users/${user}`}>User Page</Link></li>}
           {!user && <li><Link to='/users/new'>Sign Up</Link></li>}
            {!user && <li><Link to='/login'>Login</Link></li>}
           {user && <li><Link to='/productions/new'>New Production</Link></li>}
            {user && <li><Link to='/'> Home</Link></li>}
           </ul>
           }
         </Menu>

        </Nav>
    )
}

export default Navigation


const NavLink = styled(Link)`
  text-decoration: none;
  h1 {
    font-family: "Splash", cursive;
    color: #42ddf5;
      &:hover {
      color: pink;
    }
  }
`

const Nav = styled.div`
  display: flex;
  justify-content:space-between;
  
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  a{
    text-decoration: none;
    color:white;
    font-family:Arial;
  }
  a:hover{
    color:pink
  }
  ul{
    list-style:none;
  }
  button{
      background-color:#42ddf5;
      color: white;
      padding: 8px;
      font-size: 1rem;
      font-family:Arial;
      margin:10px;
    }
  
`;
