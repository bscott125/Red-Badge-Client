import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonGroup from "@mui/material/ButtonGroup";
import TicketContent from "./TicketContent";
import APIURL from '../../helpers/environment'

type ModalType = {
  open: boolean;
  slip: number;
  entry: string;
  movie: movie;
};

type movie = {
  url: string;
  name: string;
  synopsis: string;
  id: number;
};

type AcceptedProps = {
  movie: movie;
  //  sessionToken: string
};

export default class Modal extends React.Component<AcceptedProps, ModalType> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      open: false,
      slip: 0,
      entry: "",
      movie: { url: "", name: "", synopsis: "", id: 0 },
    };
  }

	componentDidMount() {
    this.setState({ movie: this.props.movie });
  }

  ticketHandleSubmit = (e: any) => {
    e.preventDefault();
    const authString = localStorage.getItem("token") || "";
    const userId = localStorage.getItem("userId");
    const slip = this.state.slip;
    console.log({ userId });
    fetch(`${APIURL}/ticket/create`, {
      method: "POST",
      body: JSON.stringify({
        ticket: {
          title: this.props.movie.name,
          slip: slip,
          entry: this.props.movie.synopsis,
          userId: userId,
          movieId: this.props.movie.id,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: authString,
      }),
    })
      .then((res) => res.json())
      .then((log) => {
        this.handleClose();
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

  handleSetSlip = (slip: number) => {
    this.setState({
      slip: slip,
    });
  };

  render() {
    return (
      <div className = 'main'>
        <Button onClick={this.handleClickOpen}>
          <img
            src={this.state.movie.url}
            alt={this.state.movie.name}
            width="325"
            height="450"
          />
        </Button>
        <TicketContent movie={this.state.movie} />
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>{this.state.movie.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.state.movie.synopsis}</DialogContentText>
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
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.ticketHandleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
