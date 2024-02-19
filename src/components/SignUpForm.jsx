import {useState} from 'react'

export default function SignUpForm({setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [submitedUsername, setSubmitedUsername] = useState("");

        /* Validate input Functions def */
    // username should be 8 char
    function isEightChar(usrN){
        return usrN.length >= 8;

    }
    // username should be a combination of letters and/or numbers
    function isAlphanumeric(usrN) {
        return /^[a-zA-Z0-9]+$/.test(usrN);
      }
    // A valid username satisfies the 2 conditions
    function isValidUsername(usrN){
        const valid = isEightChar(usrN) && isAlphanumeric(usrN);
        return valid;
    }

    // Conditionnaly fetch data from API, if the input is valid
    async function handleSubmit(ev){
        ev.preventDefault();
        setSubmitedUsername(username);
        if(isValidUsername(username)){
            console.log("fetch......")
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
                console.log(result.token);
                setToken(result.token)
            } catch (error) {
              setError(error.message);
            }
        }
        // Clear input fields
        setUsername("");
        setPassword("");
    }

    return (
        <div className='comp'>
            <h2>Sign Up!</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username: {" "} <input value={username}
                            onChange={(ev) => { setUsername(ev.target.value) }} />
                    </label>
                    <label>
                        Password: {" "} <input value={password}
                            onChange={(ev) => { setPassword(ev.target.value) }} />
                    </label>
                    <div>
                        <p> {isEightChar(username)? <span>(v)</span> : <span>(i)</span>} - username is 8 characters. </p>
                        <p> {isAlphanumeric(username)? <span>(v)</span> : <span>(i)</span>} - username is alphanumeric.</p>
                    </div>
                </div>
                
                <button className='submit-btn'>Submit</button>
            </form>

            <div>
            {submitedUsername?
                isValidUsername(submitedUsername)? 
                    <p>Valid username. Go ahead and Authenticate Token!</p>
                    : <p>Invalid username. Try again!</p>
                : ""}
            </div>
            
        </div>
    );
  }