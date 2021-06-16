import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from '@material-ui/core/Checkbox';
import NoData from "./noData";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 400,
  },
});

export interface columnI {
  id: string;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

type PropsI = {
  columns: columnI[];
  rows: any[];
  selected?: any[];
  selectKey?: string;
  selectAll? : Function;
  handleClick?: Function;
  maxHeight?: number;
  showPagination?: boolean;
  
};

function CustomTable(props: PropsI) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const isSelected = (name: string) => props && props.selected ? props.selected.indexOf(name) !== -1 : false;

  if(!props.selectKey){
    props.selectKey = props.columns[0] ? props.columns[0].id : "id"
  }

  return (
    <Paper className={classes.root}>
      <TableContainer
        className={classes.container}
        style={{ maxHeight: props.maxHeight || 400 }}
      >
        {props.rows && props.rows.length ? (
          <Table stickyHeader size="small" aria-label="sticky table">
            <TableHead>
              <TableRow>
             {props.selected &&  <TableCell padding="checkbox">
                <Checkbox
                 indeterminate={props.selected.length > 0 && props.selected.length < props.rows.filter(item => !!item && props.selectKey && !!item[props.selectKey]).length}
                 checked={props.selected.length > 0 && props.selected.length === props.rows.filter(item => !!item && props.selectKey && !!item[props.selectKey]).length}
                 onChange={(e) => props.selectAll ? props.selectAll(): {}}
                  inputProps={{ 'aria-label': 'select all desserts' }}
                />
              </TableCell>}
                {props.columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  const isItemSelected = props.selectKey ? isSelected(row[props.selectKey]) : false;
                  return row ? (
                    <TableRow 
                    hover 
                    onClick={(event) => props.handleClick && props.selectKey ? props.handleClick( row[props.selectKey]) : {}}
                    role="checkbox"
                     aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={ props.selectKey ? `${row[ props.selectKey]}-${i}` : `${i}`}
                    selected={isItemSelected}
                    >
                   { props.selected &&  
                    
                       <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': `${i}` }}
                        />
                      </TableCell>
                    }
                      {props.columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ) : null;
                })}
            </TableBody>
          </Table>
        ) : (
          <NoData data={"rows"} />
        )}
      </TableContainer>
      {props.showPagination ? (
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      ) : (
        ""
      )}
    </Paper>
  );
}

export default CustomTable;
