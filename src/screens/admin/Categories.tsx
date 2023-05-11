import { Add } from "@mui/icons-material";
import { Button, Divider, List, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Component, Fragment } from "react";
import { ConnectedProps, connect } from "react-redux";
import Category from "../../components/admin/Category";
import CategoryForm from "../../components/admin/CategoryForm";
import {
    addCategoryCreator,
    fetchCategoriesCreator,
    updateCategoryCreator,
} from "../../redux/admin/actions";
import { AppState } from "../../redux/store";
import { ProductCategory } from "../../types";
import { getRequest, postRequest, putRequest } from "../../utils/http";
import { NETWORK_ERROR_TITLE } from "../../utils/strings";
import Loading from "../../components/Loading";
import { sleep } from "../../utils/sleep";

// const categories: ProductCategory[] = [
//     {
//         id: 1,
//         name: "Electronics",
//         children: [
//             { id: 2, name: "Smartphones", parent: 1 },
//             { id: 3, name: "Watches", parent: 1 },
//             { id: 4, name: "Headphones", parent: 1 },
//         ],
//     },
//     {
//         id: 12,
//         name: "Clothes",
//         children: [
//             { id: 22, name: "Men", parent: 1 },
//             { id: 23, name: "Women", parent: 1 },
//             { id: 24, name: "Kids", parent: 1 },
//         ],
//     },
// ];

export function categoriesHelper(categories: ProductCategory[]) {
    const parents = categories.filter((category) => category.parent === null);
    const children = categories.filter((category) => category.parent !== null);
    children.forEach((child) => {
        const index = parents.findIndex((cat) => child.parent === cat.id);

        if (parents[index].children) {
            parents[index].children?.push(child);
        } else {
            parents[index].children = [child];
        }
    });

    return parents;
}
type Props = {} & PropsFromRedux;

type State = {
    category?: ProductCategory | null;
    formLoading: boolean;
    failureMessage: string;
};

class Categories extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            category: undefined,
            formLoading: false,
            failureMessage: "",
        };
    }

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

            fetch({
                ...this.props.store,
                loading: false,
                failed: false,
                allCategories: [...categories],
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

    editCategory = (category: ProductCategory) => {
        this.setState({ category });
    };

    addCategory = () => {
        this.setState({ category: null });
    };

    closeCategoryForm = () => {
        this.setState({ category: undefined });
    };

    handleSubmit = async ({
        id,
        name,
        parent,
    }: {
        name: string;
        parent?: number;
        id?: number;
    }) => {
        const { category } = this.state;

        if (category && category.name === name && category.parent === parent) {
            return;
        }

        this.setState({ formLoading: true, failureMessage: "" });

        const { fetch } = this.props;

        try {
            const data = { name, ...(parent ? { parent } : {}) };
            const create = id === undefined;

            const cat = await (create
                ? postRequest<ProductCategory[]>("/admin/category", data)
                : putRequest<ProductCategory[]>(`/admin/category/${id}`, data));

            fetch({
                ...this.props.store,
                categories: categoriesHelper(cat),
                allCategories: cat,
            });
            this.setState({ formLoading: false, category: undefined });
        } catch (error: any) {
            this.setState({
                formLoading: true,
                failureMessage: NETWORK_ERROR_TITLE,
            });
        }
    };

    render() {
        const { category } = this.state;
        const { categories, allCategories, loading, failed } = this.props.store;

        if (loading || failed) {
            return (
                <Stack width="100%" height="100%" sx={{ background: "white" }}>
                    <Stack alignItems="center" justifyContent="center" pt={10}>
                        <Loading failed={failed} onRetry={this.fetchCategories}>
                            <Typography>Try again</Typography>
                        </Loading>
                    </Stack>
                </Stack>
            );
        }

        return (
            <Stack spacing={3}>
                {category !== undefined && (
                    <CategoryForm
                        loading={false}
                        category={category}
                        onClose={this.closeCategoryForm}
                        categories={allCategories}
                        onSubmit={this.handleSubmit}
                    />
                )}

                <Stack
                    spacing={2}
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ sm: "center", xs: "flex-start" }}
                >
                    <Typography variant="h5">Product categories</Typography>
                    <Button
                        startIcon={<Add />}
                        variant="outlined"
                        onClick={this.addCategory}
                    >
                        Add Category
                    </Button>
                </Stack>

                <List>
                    {categories.map((category, index) => (
                        <Fragment key={category.id}>
                            <Category
                                category={category}
                                onEdit={this.editCategory}
                            />
                            {index !== categories.length - 1 && (
                                <Divider sx={{ mb: 2 }} />
                            )}
                        </Fragment>
                    ))}
                </List>
            </Stack>
        );
    }
}

const mapDispatchToProps = {
    fetch: fetchCategoriesCreator,
    addCategory: addCategoryCreator,
    updateCategory: updateCategoryCreator,
};

function mapStateToProps(state: AppState) {
    return {
        store: { ...state.admin.categories },
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Categories);
