import * as CategoriesConstants from '../Constants/CategoriesConstants'
import * as categoriesAPIs from '../api/CategoriesServices'
import toast from 'react-hot-toast'
import {ErrorsAction, tokenProtection} from '../Protection'

// Get all Categories action
export const getAllCategoriesAction = () => async (dispatch: any) => {
    try {
        dispatch({type: CategoriesConstants.GET_ALL_CATEGORIES_REQUEST})
        const data = await categoriesAPIs.getCategoriesService()
        dispatch({
            type: CategoriesConstants.GET_ALL_CATEGORIES_SUCCESS,
            payload: data,
        });
    } catch (error) {
        ErrorsAction(error, dispatch, CategoriesConstants.GET_ALL_CATEGORIES_FAIL);
    }
};

// Create Category action
export const createCategoryAction = (title: string) => async (dispatch: any, getState: any) => {
    try {
        dispatch({type: CategoriesConstants.CREATE_CATEGORY_REQUEST});
        await categoriesAPIs.createCategoryService(
            title,
            tokenProtection(getState)
        );
        dispatch({type: CategoriesConstants.CREATE_CATEGORY_SUCCESS});
        toast.success("Category created successfully");
        dispatch(getAllCategoriesAction());
    } catch (error) {
        ErrorsAction(error, dispatch, CategoriesConstants.CREATE_CATEGORY_FAIL);
    }
};

// Update Category action
export const updateCategoryAction =
    (id: number, title: string) => async (dispatch: any, getState: any) => {
        try {
            dispatch({type: CategoriesConstants.UPDATE_CATEGORY_REQUEST});
            await categoriesAPIs.updateCategoryService(
                id as unknown as string,
                title,
                tokenProtection(getState)
            );
            dispatch({type: CategoriesConstants.UPDATE_CATEGORY_SUCCESS});
            toast.success("Category updated successfully");
            dispatch(getAllCategoriesAction());
        } catch (error) {
            ErrorsAction(error, dispatch, CategoriesConstants.UPDATE_CATEGORY_FAIL);
        }
    };

// Delete Category action
export const deleteCategoryAction = (id: number) => async (dispatch: any, getState: any) => {
    try {
        dispatch({type: CategoriesConstants.DELETE_CATEGORY_REQUEST});
        await categoriesAPIs.deleteCategoryService(id, tokenProtection(getState));
        dispatch({type: CategoriesConstants.DELETE_CATEGORY_SUCCESS});
        toast.success("Category deleted successfully");
        dispatch(getAllCategoriesAction());
    } catch (error) {
        ErrorsAction(error, dispatch, CategoriesConstants.DELETE_CATEGORY_FAIL);
    }
};