// Dependencies
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

// Styles
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TimelineIcon from "@material-ui/icons/Timeline";
import Share from "@material-ui/icons/Share";
import BorderBottom from "@material-ui/icons/BorderBottom";
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

//Image
import qrGoolge from './qrcode.45596517.png';

const blockstack = require('blockstack');

const STORAGE_FILE = 'profile.json'

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "column",
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  avatar: {
    margin: 20
  },
  bigAvatar: {
    width: 120,
    height: 120
  },
  editButton: {
    float: "right"
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 2,
  }
});

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(0%, 50%)`,
    border: 'solid',
    background: 'white'
  };
}

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: blockstack.loadUserData(),
      sundlyProfile: {
        firstName: '',
        lastName: '',
        sex: '',
        dob: '',
      },
      open: false,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  fetchProfile() {
    blockstack.getFile(STORAGE_FILE).then((profileText) => {
      const sundlyProfile = JSON.parse(profileText)
      if(!!sundlyProfile && !!sundlyProfile.firstName) {
        this.setState({ sundlyProfile })
      }
    })
  }

  saveProfile() {
    const { sundlyProfile } = this.state

    return blockstack.putFile(STORAGE_FILE, JSON.stringify(sundlyProfile))
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  handleChange(event) {
    const target = event.target

    this.setState(prev => ({
      sundlyProfile: {
        ...prev.sundlyProfile,
        [target.name]: target.value,
      }
    }), () => this.saveProfile())
  }

  componentDidMount() {
    this.fetchProfile()
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} style={{marginTop: 60}}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Avatar
                src={this.state.user.profile.image && this.state.user.profile.image[0].contentUrl}
                className={classNames(classes.avatar, classes.bigAvatar)}
              />
              <code>{this.state.user.username}</code>
              <br />
              <Typography variant="caption" gutterBottom>
                {this.state.user.profile.description}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="title" gutterBottom>
                Clinical Profile:
              </Typography>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  autoComplete="fname"
                  className={classes.textField}
                  value={this.state.sundlyProfile.firstName}
                  onChange={this.handleChange}
                  margin="normal"
                />
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  autoComplete="lname"
                  className={classes.textField}
                  value={this.state.sundlyProfile.lastName}
                  onChange={this.handleChange}
                  margin="normal"
                />
                <Select
                  value={this.state.sundlyProfile.sex}
                  onChange={this.handleChange}
                  label="Biological Sex"
                  inputProps={{
                    name: 'sex',
                    id: 'sex',
                  }}
                  className={classes.textField}
                >
                  <MenuItem value={'m'}>Male</MenuItem>
                  <MenuItem value={'f'}>Female</MenuItem>
                </Select>
                <TextField
                  required
                  type="date"
                  id="dob"
                  name="dob"
                  label="Date of Birth"
                  autoComplete="dob"
                  className={classes.textField}
                  value={this.state.sundlyProfile.dob}
                  onChange={this.handleChange}
                  margin="normal"
                />
              </form>
            </Paper>
            <Grid container spacing={24} style={{ marginLeft: 20, marginTop: 10}}>
              <Grid item xs={4}>
                <Button variant="fab" color={`primary`}>
                  <Link to="/timeline">
                    <TimelineIcon />
                  </Link>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="fab" color={`primary`}>
                  <Link to="/contacts">
                    <Share />
                  </Link>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="fab" color={`primary`}>
                  <BorderBottom onClick={this.handleOpen} />
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                  >
                    <div style={getModalStyle()}>
                      <img src={qrGoolge} alt="google"/>
                    </div>
                  </Modal>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
