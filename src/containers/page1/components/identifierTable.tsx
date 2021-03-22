import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {identifierStateObject} from '../../../redux/actions/identifierstate/identifierStateType'
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
  row : identifierStateObject,
  key : string
}
function Row(props : rowsI) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  let primaryValue = "";

  if(row && row.primaryIdentifier && row.primaryIdentifier[0] && row.primaryIdentifier[0].response){ 
    primaryValue =  row.primaryIdentifier[0].response
  }
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {primaryValue}
        </TableCell>
        <TableCell align="right">{row.numberOfTaskCompleted}</TableCell>
        <TableCell align="right">{row.numberOfTaskFuture}</TableCell>
        <TableCell align="right">{row.numberOfTaskPending}</TableCell>
        <TableCell align="right">{row.workflowId}</TableCell>
        <TableCell align="right">{row.flowStatus}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
              <ReactJson src={row} />
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


interface CollapsibleTableI {
  identifiers? : Array<identifierStateObject>
}
export default function CollapsibleTable(props: CollapsibleTableI) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Primary Identifier</TableCell>
            <TableCell align="right">numberOfTaskCompleted&nbsp;(g)</TableCell>
            <TableCell align="right">numberOfTaskFuture&nbsp;(g)</TableCell>
            <TableCell align="right">numberOfTaskPending&nbsp;(g)</TableCell>
            <TableCell align="right">flowStatus&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.identifiers && props.identifiers.map((row:identifierStateObject) => (
            <Row key={row.primaryResponse} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}