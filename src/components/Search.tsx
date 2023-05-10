import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";

const SearchBox = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius + 10,
    border: "1px gray solid",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderColor: theme.palette.primary.main,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    background: "red",
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(1)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
    },
    width: "calc(100% - 40px)",
}));

export default function Search() {
    return (
        <SearchBox>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
            />
            <IconButton>
                <SearchIcon />
            </IconButton>
        </SearchBox>
    );
}
