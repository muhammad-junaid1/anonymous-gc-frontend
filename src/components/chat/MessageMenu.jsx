import { RxCaretDown } from "react-icons/rx";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoMdTrash } from "react-icons/io";
import { TiArrowForward } from "react-icons/ti";
import { useState } from "react";
import ForwardMessageModal from "./ForwardMessageModal";

export default function MessageMenu({ forMe, setData, anchorEl, setAnchorEl, data }) {
  const open = Boolean(anchorEl);
  const [forwardMessageModal, setForwardMessageModal] = useState({
    isOpen: false,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleForward = () => {
    setForwardMessageModal({
      isOpen: true, 
      data, 
      forMe
    }); 
    handleClose();
  }
  return (
    <>
      <div>
        <RxCaretDown
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="cursor-pointer caret-down-icon"
          size={28}
          style={{ color: "white" }}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          sx={{
            "& .MuiMenu-list": {
              padding: 0,
            },
          }}
          anchorOrigin={
            forMe && {
              vertical: "top",
              horizontal: "center",
            }
          }
          transformOrigin={
            forMe && {
              vertical: "top",
              horizontal: "right",
            }
          }
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={handleForward}
            className="flex items-center text-green-500"
          >
            <TiArrowForward size={20} style={{ color: "green" }} />{" "}
            <p className="ml-2 pr-4 mb-0 font-medium">Forward</p>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            className="flex items-center text-red-500"
          >
            <IoMdTrash size={20} style={{ color: "red" }} />{" "}
            <p className="ml-2 pr-4 mb-0 font-medium">Delete</p>
          </MenuItem>
        </Menu>
      </div>

      {forwardMessageModal?.isOpen && (
        <ForwardMessageModal
          setData={setData}
          forwardMessageModal={forwardMessageModal}
          handleClose={() => setForwardMessageModal({ isOpen: false })}
        />
      )}
    </>
  );
}
