import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Component } from "react";
import { ConnectedProps, connect } from "react-redux";
import Loading from "../../components/Loading";
import { fetchUsersCreator } from "../../redux/admin/actions";
import { AppState } from "../../redux/store";
import { getRequest } from "../../utils/http";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

type Props = {} & PropsFromRedux;

class Users extends Component<Props> {
    componentDidMount(): void {
        if (!this.props.store.loading && this.props.store.users.length === 0) {
            this.fetchUsers();
        }
    }

    fetchUsers = async () => {
        const { fetch } = this.props;

        fetch({
            ...this.props.store,
            loading: true,
            failed: false,
        });

        try {
            const users = await getRequest("/admin/users");

            fetch({
                ...this.props.store,
                loading: false,
                failed: false,
                users: [...users],
            });
        } catch (error) {
            fetch({
                ...this.props.store,
                loading: false,
                failed: true,
            });
        }
    };

    render() {
        const { users, failed, loading } = this.props.store;

        if (loading || failed) {
            return (
                <Stack width="100%" height="100%" sx={{ background: "white" }}>
                    <Stack alignItems="center" justifyContent="center" pt={10}>
                        <Loading failed={failed} onRetry={this.fetchUsers}>
                            <Typography>Try again</Typography>
                        </Loading>
                    </Stack>
                </Stack>
            );
        }

        return (
            <Stack spacing={3}>
                <Typography variant="h5">Application users</Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">
                                    User emails
                                </StyledTableCell>
                                <StyledTableCell
                                    sx={{ display: { xs: "none", sm: "flex" } }}
                                >
                                    User ids
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <StyledTableRow key={user.uid}>
                                    <StyledTableCell
                                        component="th"
                                        scope="row"
                                        sx={{
                                            display: { xs: "none", sm: "flex" },
                                        }}
                                    >
                                        {user.uid}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {user.email}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        );
    }
}

const mapDispatchToProps = {
    fetch: fetchUsersCreator,
};

function mapStateToProps(state: AppState) {
    return {
        store: { ...state.admin.users },
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Users);
