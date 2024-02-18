import {useState} from 'react'

export default function SignUpForm({setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(ev){
        ev.preventDefault();
        try {
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', 
              { 
                method: "POST", 
                headers: { 
                  "Content-Type": "application/json" 
                }, 
                body: JSON.stringify({ username, password })
              })
            const result = await response.json();
            console.log(result);
            setToken(result.token)
        } catch (error) {
          setError(error.message);
        }
    }

    return (
        <>
            <h2>Sign Up!</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username: {" "} <input value={username}
                        onChange={(ev) => { setUsername(ev.target.value) }} />
                </label>
                <label>
                    Password: {" "} <input value={password}
                        onChange={(ev) => { setPassword(ev.target.value) }} />
                </label>
                <button>Submit</button>
            </form>
        </>
    
    );
  }