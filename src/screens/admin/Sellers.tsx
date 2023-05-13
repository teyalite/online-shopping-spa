import { LoadingButton } from "@mui/lab";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    tableCellClasses,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import { Component, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import Loading from "../../components/Loading";
import { fetchSellersCreator } from "../../redux/admin/actions";
import { AdminSellersState, Store } from "../../redux/admin/types";
import { AppState } from "../../redux/store";
import { getRequest, postRequest } from "../../utils/http";

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

type Props = PropsFromRedux & {};

class AdminSeller extends Component<Props> {
    componentDidMount(): void {
        if (!this.props.store.loading && this.props.store.stores.length === 0) {
            this.fetchStores();
        }
    }

    fetchStores = async () => {
        const { fetch } = this.props;

        fetch({
            ...this.props.store,
            loading: true,
            failed: false,
        });

        try {
            const stores = await getRequest("/admin/sellers");

            fetch({
                ...this.props.store,
                loading: false,
                failed: false,
                stores: [...stores],
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
        const { stores, loading, failed } = this.props.store;

        if (loading || failed) {
            return (
                <Stack width="100%" height="100%" sx={{ background: "white" }}>
                    <Stack alignItems="center" justifyContent="center" pt={10}>
                        <Loading failed={failed} onRetry={this.fetchStores}>
                            <Typography>Try again</Typography>
                        </Loading>
                    </Stack>
                </Stack>
            );
        }

        return (
            <Stack spacing={3}>
                <Typography variant="h5">Application Sellers</Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">
                                    Store
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    Email
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    Status
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stores.map((store) => (
                                <Row
                                    key={store.id}
                                    store={store}
                                    fetch={this.props.fetch}
                                    state={this.props.store}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        );
    }
}

function Row({
    store,
    state,
    fetch,
}: {
    store: Store;
    state: AdminSellersState;
    fetch: (s: AdminSellersState) => void;
}) {
    const [loading, setLoading] = useState(false);

    const approve = async () => {
        setLoading(true);

        try {
            const stores = await postRequest(
                "/admin/approve/" + store.id,
                undefined
            );

            fetch({
                ...state,
                stores,
            });
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    return (
        <StyledTableRow>
            <StyledTableCell component="th" align="left" scope="row">
                {store.name}
            </StyledTableCell>
            <StyledTableCell align="left">{store.email}</StyledTableCell>
            <StyledTableCell align="left">
                <LoadingButton
                    size="small"
                    variant="contained"
                    disableElevation
                    loading={loading}
                    disabled={store.approved}
                    onClick={approve}
                >
                    {!store.approved ? "Approve" : "Approved"}
                </LoadingButton>
            </StyledTableCell>
        </StyledTableRow>
    );
}

const mapDispatchToProps = {
    fetch: fetchSellersCreator,
};

function mapStateToProps(state: AppState) {
    return {
        store: { ...state.admin.sellers },
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AdminSeller);
