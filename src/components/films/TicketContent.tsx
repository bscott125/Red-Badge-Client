import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonGroup from "@mui/material/ButtonGroup";
import { CardActionArea } from "@mui/material";
import APIURL from '../../helpers/environment'

type DisplayPost = {
  tickets: ticket[];
  ticket: ticket;
  open: boolean;
};

type movie = {
  url: string;
  name: string;
  synopsis: string;
  id: number;
};

type user = {
  id: number;
  tickets: ticket[];
};

type ticket = {
  entry: string;
  movieId: number;
  slip: number;
  title: string;
  userId: number;
	id: number;
};

type AcceptedProps = {
  movie: movie;
};

const defaultTicket = { entry: "", movieId: 0, slip: 0, title: "", userId: 0, id: 0 };
export default class TicketContent extends React.Component<
  AcceptedProps,
  DisplayPost
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      tickets: [],
      ticket: defaultTicket,
      open: false,
    };
  }

	componentWillReceiveProps() {
		this.getTickets();  
	}

  getTickets = () => {
    const authString = localStorage.getItem("token") || "";
    fetch(`${APIURL}/ticket/mine`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: authString,
      }),
    })
      .then((res) => res.json())
      .then((logContent) => {
        const users = logContent.user as user[];
        // console.log({top: users})
        const userId = localStorage.getItem("userId") as unknown as number;
        const user = users?.find((u) => u.id == userId);
        const tickets = user?.tickets.filter(
          (t) => t.movieId == this.props.movie.id
        );
        this.setState({ tickets: (tickets as ticket[]) || [] });
				console.log({tickets})
      });
  };

  ticketHandleUpdate = (e: any) => {
    e.preventDefault();
    const authString = localStorage.getItem("token") || '';
    fetch(`${APIURL}/ticket/update/${this.state.ticket.id}`, {
    		method: 'PUT',
    		body: JSON.stringify(this.state.ticket),
    		headers: new Headers({
    				'Content-Type': 'application/json',
    				'Authorization': authString
    		})
    }).then((res) => res.json())
    	.then((log) => {
				this.getTickets();
    		this.handleClose();
    })
  };

  handleDelete = () => {
		const authString = localStorage.getItem("token") || '';
    fetch(`${APIURL}/ticket/delete/${this.state.ticket.id}`, {
    		method: 'DELETE',
    		headers: new Headers({
    				'Content-Type': 'application/json',
    				'Authorization': authString
    		})
    }).then((res) => res.json())
    	.then((log) => {
				this.getTickets();
				this.setState({ticket: defaultTicket})
    		this.handleClose();
    })
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

  handleSetSlip = (slip: number) => {
    this.setState({
      ticket: {
				...this.state.ticket,
				slip: slip
			},
    });
  };

  render() {
    return (
      <div>
        {this.state.tickets.map((ticket) => {
          return (
            <Card
              onClick={() => {
                this.setState({ ticket: ticket });
                this.handleClickOpen();
              }}
              sx={{ maxWidth: 345 }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {ticket.title}
                  </Typography>
                  <Typography>{ticket.slip}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ticket.entry}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>{this.state.ticket.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.state.ticket.entry}</DialogContentText>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button onClick={() => this.handleSetSlip(1)}>One</Button>
              <Button onClick={() => this.handleSetSlip(2)}>Two</Button>
              <Button onClick={() => this.handleSetSlip(3)}>Three</Button>
            </ButtonGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDelete}>Delete</Button>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.ticketHandleUpdate}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
