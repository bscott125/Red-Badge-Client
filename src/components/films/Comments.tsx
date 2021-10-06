import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { title } from 'process';
import CommentsDisplay from './CommentsDisplay';
import APIURL from '../../helpers/environment'

type CommentModal = {
	open: boolean,
	title: string,
	date: string,
	entry: string,
	id: number,
	version: number
}


export default class Comments extends React.Component<{},CommentModal> {
	constructor(props: any){
		super(props)
this.state =
{
	open: false,
	title: '',
	date: '',
	entry: '',
	id: 0,
	version: 0,
}
	}

	commentHandleSubmit = (e: any) => {
    e.preventDefault();
    const authString = localStorage.getItem("token") || "";
    const userId = localStorage.getItem("userId");
    console.log({ userId });
    fetch(`${APIURL}/comment/create`, {
      method: "POST",
      body: JSON.stringify({
        comment: {
          title: this.state.title,
          date: this.state.date,
          entry: this.state.entry,
          userId: userId
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: authString,
      }),
    })
      .then((res) => res.json())
      .then((log) => {
				console.log(log)
        this.handleClose();
				this.setState({
					version: this.state.version+1
				})
      });
  };

 
	handleTitleChange = (e: any) => {
		this.setState({
			title: e.target.value
		})
		}

	handleDateChange = (e: any)  => {
		this.setState({
			date: e.target.value
		})
		}
	handleEntryChange = (e: any) => {
  this.setState({
		entry: e.target.value
	})
	}

	handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

	
	render(){
		return(
     <div>
         <Button variant="outlined" onClick={this.handleClickOpen}>
        Write about your experience!
      </Button>
			<CommentsDisplay version={this.state.version}/>
      <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle>Post your comment!</DialogTitle>
				<TextField 
				id="outlined-basic" 
				label="Movie Title" 
				variant="outlined" 
				value ={this.state.title}
				onChange = {this.handleTitleChange} />
        <DialogContent>
				<label>Date:</label>
				<input type="date" id="start" name="trip-start"
        onChange={this.handleDateChange}
				value={this.state.date}
        min="01-10-2020" max="12-31-2023" />
          <TextField
            id="outlined-multiline-flexible"
						label="Multiline"
						multiline
						maxRows={4}
						value={this.state.entry}
						onChange={this.handleEntryChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button onClick={this.commentHandleSubmit}>Post</Button>
        </DialogActions>
      </Dialog>
		 </div>
		)
	}
}