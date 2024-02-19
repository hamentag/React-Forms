import { useState } from 'react'

export default function Authenticate({token}) {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [username, setUsername] = useState("");

    async function handleClick(){
        try{
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', 
            { 
              method: "GET", 
              headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            })
            const result = await response.json();
            console.log(result.data.username); 
            setSuccessMessage(result.message);
            setUsername(result.data.username);

        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className='comp'>
          <h2>Authenticate!</h2>
          <button onClick={()=>handleClick()}>Authenticate Token</button>
          
          <div className='dialog-box'>Output:
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
            {username && <p>Your user name: {username}</p>}
          </div>
        </div>
    );
  }