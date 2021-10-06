import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import APIURL from '../../helpers/environment';


type Signup = {
	email: string,
	password: string,
	sessionToken: string,
  updateToken: string
}

type Prop = {
	updateToken: (newToken: string, userId: string) => void;
}




export default class Registration extends React.Component<Prop, Signup>{
	constructor(props: Prop){
		super(props)
		this.state = {
     email: "",
		 password: "",
		 sessionToken: '',
     updateToken: ''
		}

		
	}

	
	handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`${APIURL}/user/register`, {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data)
				this.props.updateToken(data.sessionToken, data.user.id)
      })
			.catch(err => console.log(err))
  } 

	
render(){
	return(
		<div>
			<h3>Create an account</h3>
		 <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >
      <TextField
        helperText="Please enter your email"
        id="demo-helper-text-aligned"
        label="Email"
				value= {this.state.email}
				onChange={e => this.setState({ email: e.target.value })} 
      />
      <TextField
        helperText="Please enter your password "
        id="demo-helper-text-aligned-no-helper"
        label="Password"
				value={this.state.password} 
				onChange={e => this.setState({ password: e.target.value })}
				type="password"
				 placeholder='Password' 
      />
			<Button onClick={(e: any) => this.handleSubmit(e)} type='button' className="submitBtn" variant="outlined">Submit</Button>
    </Box>
		</div>
	)
}
}