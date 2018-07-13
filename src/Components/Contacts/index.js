// Dependencies
import React from "react";
import PropTypes from "prop-types";

// Styles
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";

const styles = theme => ({
  root: {
    width: "100%",
    position: "relative",
    minHeight: 200
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class Contacts extends React.Component {
  state = {
    contacts: [
      { id: 1, name: "Dr. Johnny Crypto", specialty: "General practice" },
      { id: 2, name: "Elvis Prescription", specialty: "Dermatology" },
      { id: 3, name: "M.D. Paul McBitcoin", specialty: "Pediatrics" },
      { id: 4, name: "Kurt Codebrain", specialty: "Oncology" },
      { id: 5, name: "Dr. Jimi Haskell", specialty: "General practice" },
      { id: 7, name: "M.D. David Bowser", specialty: "Ophthalmology" },
      { id: 8, name: "Bob Dyslexia", specialty: "Rehabilitation" },
      { id: 9, name: "M.D. Eric Kripton", specialty: "Radiology" }
    ]
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {this.state.contacts.map(contact => (
            <ListItem
              key={contact.id}
              dense
              button
              className={classes.listItem}
            >
              <Avatar
                src={`https://api.adorable.io/avatars/285/${contact.name}.png`}
              />
              <ListItemText
                primary={contact.name}
                secondary={contact.specialty}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <ShareIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Button variant="fab" className={classes.fab} color={`primary`}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}

Contacts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Contacts);
