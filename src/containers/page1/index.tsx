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
import { getIdentifierData } from '../../redux/actions/identifierstate';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

interface State {
  IdentifierName: string;
  CompanyName: string;
}

export default function FormattedInputs() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    CompanyName: 'usecase',
    IdentifierName: '1320',
  });
  const {
   identifiers,
   totalIdentifiers,
   error
  } = useSelector((state: RootStoreI) => state.identifierData);

  useEffect(() => {
    if(values.IdentifierName){
      if(values.IdentifierName.endsWith("#")){
        getIdentifierDispatch()
      }
      
    }
  }, [values.IdentifierName]);

  const getIdentifierDispatch = () => {
    dispatch(getIdentifierData(values.CompanyName,values.IdentifierName));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  console.log(identifiers)

  return (
    <div className={classes.root}>
      <FormControl>
        <InputLabel htmlFor="formatted-text-mask-input">Company</InputLabel>
        <Input
          value={values.CompanyName}
          onChange={handleChange}
          name="CompanyName"
          id="formatted-text-mask-input"
          
        />
      </FormControl>
      <TextField
        label="react-number-format"
        value={values.IdentifierName}
        onChange={handleChange}
        name="IdentifierName"
        id="formatted-numberformat-input"
       
      />

      <IdentifierTable identifiers={identifiers}/>
    </div>
  );
}
