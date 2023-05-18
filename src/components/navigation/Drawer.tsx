import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { SxProps } from "@mui/material/styles";
import { Component } from "react";
import { ConnectedProps, connect } from "react-redux";
import { fetchDrawerCreator } from "../../redux/home/actions";
import { AppState } from "../../redux/store";
import { getRequest } from "../../utils/http";
import { categoriesHelper } from "../../screens/admin/Categories";
import { Stack, Typography } from "@mui/material";
import Loading from "../Loading";
import { sleep } from "../../utils/sleep";
import { Link } from "react-router-dom";
import { ProductCategory } from "../../types";
import Logo from "../Logo";

type Props = PropsFromRedux & {
    toggle: (val: boolean) => () => void;
    open: boolean;
    sx: SxProps;
    anchor: "top" | "left";
};

class Drawer extends Component<Props> {
    componentDidMount(): void {
        if (
            !this.props.store.loading &&
            this.props.store.categories.length === 0
        ) {
            this.fetchCategories();
        }
    }

    fetchCategories = async () => {
        const { fetch } = this.props;

        fetch({
            ...this.props.store,
            loading: true,
            failed: false,
        });

        try {
            const categories = await getRequest("/categories");
            await sleep(1);

            fetch({
                ...this.props.store,
                loading: false,
                failed: false,
                categories: categoriesHelper(categories),
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
        const { toggle, open, sx, anchor } = this.props;

        const { categories, loading, failed } = this.props.store;

        if (loading || failed) {
            return (
                <MuiDrawer open={open} onClose={toggle(false)} anchor={anchor}>
                    <Stack
                        sx={{ background: "white", height: 200, width: 300 }}
                    >
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            pt={10}
                        >
                            <Loading
                                failed={failed}
                                onRetry={this.fetchCategories}
                            >
                                <Typography>Try again</Typography>
                            </Loading>
                        </Stack>
                    </Stack>
                </MuiDrawer>
            );
        }

        return (
            <MuiDrawer open={open} onClose={toggle(false)} anchor={anchor}>
                <List sx={sx}>
                    {anchor === "left" && (
                        <ListItem>
                            <Logo disabled />
                        </ListItem>
                    )}
                    {categories.map((cat) => (
                        <Category
                            key={cat.id}
                            category={cat}
                            close={toggle(false)}
                        />
                    ))}
                </List>
            </MuiDrawer>
        );
    }
}

function Category({
    category,
    close,
}: {
    category: ProductCategory;
    close: any;
}) {
    return (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={close}>
                    <Link
                        to={"/?category=" + category.id}
                        style={{ width: "100%" }}
                    >
                        <ListItemText primary={category.name} />
                    </Link>
                </ListItemButton>
            </ListItem>

            {category.children && category.children.length !== 0 && (
                <List sx={{ ml: 4 }}>
                    {category.children.map((child) => (
                        <Category
                            key={child.id}
                            category={child}
                            close={close}
                        />
                    ))}
                </List>
            )}
        </>
    );
}

const mapDispatchToProps = {
    fetch: fetchDrawerCreator,
};

function mapStateToProps(state: AppState) {
    return {
        store: { ...state.home.drawer },
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Drawer);
