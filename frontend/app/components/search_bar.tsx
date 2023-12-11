// Import necessary libraries and components
import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

// Styled components for the search bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.8),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.9),
  },
  marginRight: theme.spacing(0),
  marginLeft: theme.spacing(0),
  width: "100%",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  right: 0,
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  marginLeft: theme.spacing(2),
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
    width: "100%", // Adjusted to make the search bar much longer
    [theme.breakpoints.up("md")]: {
      width: "40ch", // Adjust the width as needed
    },
  },
}));

// Define the SearchBar component
interface SearchBarProps {
  onDataSearch: (searchQuery: string) => void;
}

function SearchBar({ onDataSearch }: SearchBarProps) {
  // State to manage the search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Handler for updating the search query
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onDataSearch(query); // Pass the search query to the parent component
  };

  return (
    <Toolbar>
      <Search>
        <StyledInputBase
          placeholder="Enter User Name or ID.."
          inputProps={{ "aria-label": "search" }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
      </Search>
    </Toolbar>
  );
}

export default SearchBar;
