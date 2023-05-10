import { Add } from "@mui/icons-material";
import { Button, Divider, List, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Component, Fragment } from "react";
import { ConnectedProps, connect } from "react-redux";
import Category from "../../components/admin/Category";
import CategoryForm from "../../components/admin/CategoryForm";
import {
    addCategoryCreator,
    updateCategoryCreator,
} from "../../redux/admin/actions";
import { AppState } from "../../redux/store";
import { ProductCategory } from "../../types";
import { postRequest, putRequest } from "../../utils/http";
import { NETWORK_ERROR_TITLE } from "../../utils/strings";

const categories: ProductCategory[] = [
    {
        id: 1,
        name: "Electronics",
        children: [
            { id: 2, name: "Smartphones", parent: 1 },
            { id: 3, name: "Watches", parent: 1 },
            { id: 4, name: "Headphones", parent: 1 },
        ],
    },
    {
        id: 12,
        name: "Clothes",
        children: [
            { id: 22, name: "Men", parent: 1 },
            { id: 23, name: "Women", parent: 1 },
            { id: 24, name: "Kids", parent: 1 },
        ],
    },
];

type Props = {} & PropsFromRedux;

type State = {
    category?: ProductCategory | null;
    formLoading: boolean;
    failureMessage: string;
};

class Categories extends Component<Props, State> {
    private categories: ProductCategory[];

    constructor(props: Props) {
        super(props);
        this.state = {
            category: undefined,
            formLoading: false,
            failureMessage: "",
        };

        this.categories = [categories[0], ...(categories[0].children ?? [])];
    }

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

        const { addCategory, updateCategory } = this.props;

        try {
            const data = { name, ...(parent ? { parent } : {}) };
            const create = id === undefined;

            const cat = await (create
                ? postRequest<ProductCategory>("/admin/category", data)
                : putRequest<ProductCategory>(`/admin/category/${id}`, data));

            create ? addCategory(cat) : updateCategory(cat);
            this.setState({ formLoading: false });
        } catch (error: any) {
            this.setState({
                formLoading: true,
                failureMessage: NETWORK_ERROR_TITLE,
            });
        }
    };

    render() {
        const { category } = this.state;

        return (
            <Stack spacing={3}>
                {category !== undefined && (
                    <CategoryForm
                        loading={false}
                        category={category}
                        onClose={this.closeCategoryForm}
                        categories={this.categories}
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
    addCategory: addCategoryCreator,
    updateCategory: updateCategoryCreator,
};

function mapStateToProps(state: AppState) {
    return {
        ...state.admin.categories,
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Categories);
