import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


type PropsI = {
    status: string;
    menu: string[];
    handleUpdate: Function;
  };
export default function SimpleMenu(props: PropsI) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value?:string) => {
    if(value)
    props.handleUpdate(value)
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {props.status}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
      >
        {
            props.menu.map(item => <MenuItem onClick={() => handleClose(item)}>{item}</MenuItem>)
        }
        
      </Menu>
    </div>
  );
}
