import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {leadObject} from '../../../redux/actions/leads/identifierStateType'
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ReactJson from 'react-json-view'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


interface rowsI{
  row : leadObject,
  key : string
}
function Row(props : rowsI) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        
        <TableCell component="th" scope="row">
          {row['cf-company']}
        </TableCell>
        <TableCell align="right">{row['cf-email']}</TableCell>
        <TableCell align="right">{row['cf-name']}</TableCell>
        <TableCell align="right">{row['cf-revenue']}</TableCell>
        <TableCell align="right">{row['cf-url']}</TableCell>
        <TableCell align="right">{row['utm_campaign']}</TableCell>
        <TableCell align="right">{row['utm_medium']}</TableCell>
        <TableCell align="right">{row['utm_source']}</TableCell>
      </TableRow>
      
    </React.Fragment>
  );
}


interface CollapsibleTableI {
  identifiers? : Array<leadObject>
}
export default function CollapsibleTable(props: CollapsibleTableI) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            
            <TableCell>Compnay Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">time</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">utm_campaign</TableCell>
            <TableCell align="right">utm_medium</TableCell>
            <TableCell align="right">utm_source</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.identifiers && props.identifiers.map((row:leadObject) => (
            <Row key={row.entry} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}