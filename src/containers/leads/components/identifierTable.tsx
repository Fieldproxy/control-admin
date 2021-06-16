import React from 'react';

import {leadObject} from '../../../redux/actions/leads/identifierStateType'

import CustomTable,{ columnI } from '../../../components/table';
import Menu from '../../../components/menu';
import { useState } from 'react';
import { modifyIdentifierData } from '../../../redux/actions/leads';
import { useDispatch } from 'react-redux';


const columns: columnI[] = [
  
  {
    id: "status",
    minWidth: 130,
    label: "status"
  },
  {
    id: "cf-email",
    label: "Email",
    minWidth: 130,
  },
  {
    id: "cf-name",
    label: "Name",
    minWidth: 200,
  },
  {
    id: "time",
    label: "Submitted time",
    minWidth: 70,
  },
  {
    id: "cf-revenue",
    label: "agents",
    minWidth: 70,
  },

  {
    id: "cf-url",
    label: "phone",
    minWidth: 70,
  },
  {
    id: "utm_campaign",
    label: "campaign",
    minWidth: 100,
  },
  {
    id: "utm_medium",
    label: "medium",
    minWidth: 100,
  },
  {
    id: "utm_source",
    label: "source",
    minWidth: 70,
  }
];

interface CollapsibleTableI {
  identifiers? : Array<leadObject>
}
export default function CollapsibleTable(props: CollapsibleTableI) {
  const dispatch = useDispatch();
  let [selected,handleSelected] = useState<string[]>([]);

  const selectAll = () => {
    if(selected && selected.length){
      handleSelected([])
      return
    }

    if(props.identifiers){
        let selectedEmails = props.identifiers.map(item => item["cf-url"]).filter(item => !!item)
console.log(selectedEmails)
        handleSelected(selectedEmails)
    }

  }

  const handleClick = (key:string) => {
    if(!key){
      
      return
    }

    if(key){
        let hasValue = selected ? selected.indexOf(key) !== -1 : false;
        if(hasValue){
          handleSelected(selected.filter(item => item !== key))
        }
        else {

          let selectedI = [...selected,key]
          handleSelected(selectedI)
        }
        
    }

  }
  
  return (
    <CustomTable
    columns={columns}
    selected={selected}
    selectKey={"cf-url"}
    selectAll={selectAll}
    handleClick={handleClick}
    rows={props.identifiers ? props.identifiers.reverse().map((item) => ({
      ...item,
      status : (
        <Menu status={item["cf-status"] ? item["cf-status"] : "Fill Status"} menu={['converted','trail','stage1','stage2','beta','later','invalid',"Moved to freshworks"]} handleUpdate={(value:string) => {
          console.log(value)
          props.identifiers?.forEach((mat,index) => {
            if(mat["cf-url"] === item["cf-url"]){
              dispatch(modifyIdentifierData({...mat,"cf-status": value},index))
            }
          })
        }}/>
      )
    })) : []}
    showPagination={true}
    maxHeight={560}
  />
   
  );
}

// <TableContainer component={Paper}>
// <Table aria-label="collapsible table">
//   <TableHead>
//     <TableRow>
      
//       <TableCell>Compnay Name</TableCell>
//       <TableCell align="right">Email</TableCell>
//       <TableCell align="right">Name</TableCell>
//       <TableCell align="right">time</TableCell>
//       <TableCell align="right">agents</TableCell>
//       <TableCell align="right">Phone</TableCell>
//       <TableCell align="right">utm_campaign</TableCell>
//       <TableCell align="right">utm_medium</TableCell>
//       <TableCell align="right">utm_source</TableCell>
//     </TableRow>
//   </TableHead>
//   <TableBody>
//     {props.identifiers && props.identifiers.map((row:leadObject) => (
//       <Row key={row.entry} row={row} />
//     ))}
//   </TableBody>
// </Table>
// </TableContainer>