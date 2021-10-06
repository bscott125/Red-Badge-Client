import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonGroup from "@mui/material/ButtonGroup";
import { CardActionArea } from "@mui/material";
import Comments from './Comments';
import APIURL from '../../helpers/environment'

type Comment = {
	title: string;
	date: string;
	entry: string;
	id: number;
};

type NewState ={
	comment: Comment[],
	open: boolean,
	post: Comment
}
type AcceptedProps = {
version: number,
}

type user = {
  id: number,
	comments: Comment[]
};
const defaultPost = { title: "", date: "", entry: "", id: 0 };
export default class CommentsDisplay extends React.Component<AcceptedProps, NewState> {
constructor(props: AcceptedProps){
	super(props)
	this.state = {
		comment: [],
		post: defaultPost,
		open: false
	}
}

componentWillReceiveProps() {
	this.getComments()
}

	getComments = () => {
    const authString = localStorage.getItem("token") || "";
    fetch(`${APIURL}/comment/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: authString,
      }),
    })
      .then((res) => res.json())
      .then((logContent) => {
        console.log(logContent)
        const users = logContent.user as user[]
				const userId = localStorage.getItem("userId") as unknown as number;
        const user = users?.find((u) => u.id == userId);
				this.setState({ comment: user?.comments || [] })
				console.log({ comment: user?.comments })
      });
  };
	
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

 

      
	
	handleSetTitle = (title: string) => {
		this.setState({
			post: {
				...this.state.post,
				title: title
			},
    });
  };

	handleSetDate = (date: string) => {
    this.setState({
      post: {
				...this.state.post,
				date: date
			},
    });
  };

	handleSetEntry = (entry: string) => {
		this.setState({
			post: {
				...this.state.post,
				entry: entry
			},
    });
  };
	
	commentHandleUpdate = (e: any) => {
		console.log({'PUT': this.state.post})
		e.preventDefault();
		const authString = localStorage.getItem("token") || '';
		fetch(`${APIURL}/comment/update/${this.state.post.id}`, {
				method: 'PUT',
				body: JSON.stringify(this.state.post),
				headers: new Headers({
						'Content-Type': 'application/json',
						'Authorization': authString
				})
		}).then((res) => res.json())
			.then((log) => {
				this.getComments()
				this.handleClose();
		})
	};
	handleDelete = (e: any) => {
		e.preventDefault()
		const authString = localStorage.getItem("token") || '';
    fetch(`${APIURL}/comment/delete/${this.state.post.id}`, {
    		method: 'DELETE',
    		headers: new Headers({
    				'Content-Type': 'application/json',
    				'Authorization': authString
    		})
    }).then((res) => res.json())
    	.then((log) => {
				this.setState({post: defaultPost})
				this.getComments()
    		this.handleClose();
    })
  };

	render(){
		return(
			<>
      {this.state.comment.map((current) => {
				console.log('commentmap', current)
			return (
				<Card onClick={() => {
					this.setState({ post: current });
					this.handleClickOpen();
				}}
				sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
									{current.title}
                  </Typography>
                  <Typography>{current.date}</Typography>
                  <Typography variant="body2" color="text.secondary">
										{current.entry}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
			)
	})}
	 <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle>Post your comment!</DialogTitle>
				<TextField 
				id="outlined-basic" 
				label="Movie Title" 
				variant="outlined" 
				value ={this.state.post.title}
				onChange={(e) => this.handleSetTitle(e.target.value)} />
        <DialogContent>
				<label>Date:</label>
				<input type="date" id="start" name="trip-start"
				value={this.state.post.date}
        onChange={(e) => this.handleSetDate(e.target.value)}
        min="01-10-2020" max="12-31-2023" />
          <TextField
            id="outlined-multiline-flexible"
						label="Multiline"
						multiline
						maxRows={4}
						value={this.state.post.entry}
						onChange={(e) => this.handleSetEntry(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
				<Button onClick={this.handleDelete}>Delete</Button>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button onClick={this.commentHandleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
			</>
		)
	}
}