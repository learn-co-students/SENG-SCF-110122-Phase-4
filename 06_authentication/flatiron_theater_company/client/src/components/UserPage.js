import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
function UserPage(){
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState(false)
    
    const params = useParams()
    const {id} = params
    useEffect(()=>{
        fetch(`/users/${id}`)
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    setUser(user)
                    setLoading(false)
                })
            }else {
                res.json().then(data => setErrors(data.errors))
            }
        })
       
    },[])

    if(errors) return <h1>{errors}</h1>
    if(loading) return <h1>Loading</h1>
    return (
        <div>
            <h1>{user.name}</h1>
            <h3>Tickets</h3>
            <ul>
               {user.tickets.map(({formatted_price, production_name, id}) => <li key={id}>Title: {production_name} <span style={{color: 'pink'}}>//</span> Price: {formatted_price}</li>)}
            </ul>
        </div>
    )
}

export default UserPage