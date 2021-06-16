  import React, { useEffect } from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import IdentifierTable from './components/identifierTable'
import { useDispatch, useSelector } from 'react-redux';
import { RootStoreI } from "../../redux/reducers";
import { getIdentifierData } from '../../redux/actions/leads';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);



export default function FormattedInputs() {
  const dispatch = useDispatch();
  const classes = useStyles();
 
  const {
   leads,
  } = useSelector((state: RootStoreI) => state.leads);

  useEffect(() => {
    dispatch(getIdentifierData())
  }, []);
  console.log(leads)
  return (
    <div className={classes.root}>
      

      <IdentifierTable identifiers={leads}/>
    </div>
  );
}
