import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import LanguageIcon from '@material-ui/icons/Language';

const useStyles = makeStyles({
  root: {
    
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 50
  },
});

export default function FootNav({screenConfig}) {
  const classes = useStyles();

  return (
    <BottomNavigation
      value={screenConfig[0]}
      onChange={(event, newValue) => {
        screenConfig[1](newValue)
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Global" icon={<LanguageIcon />} />
      <BottomNavigationAction label="Country" icon={<LocationSearchingIcon />} />
    </BottomNavigation>
  );
}