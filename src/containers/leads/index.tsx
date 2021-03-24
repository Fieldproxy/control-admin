  import React, { useEffect } from 'react';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
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
   totalIdentifiers,
   error
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
