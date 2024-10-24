import Axios from "./Axios";

// ************ PUBLIC APIs ************

// Get all categories API function
const getCategoriesService = async () => {
    const { data } = await Axios.get("/categories");
    return data;
};

// ************ ADMIN APIs ************

// create new category API function
// const createCategoryService = async (title: string, token: any) => {
//     const {data} = await Axios.post("/categories", title, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     return data;
// };

const createCategoryService = async (title_ARM: string, title_ENG: string, title_RU: string, token: any) => {
    const { data } = await Axios.post("/categories", { title_ARM, title_ENG, title_RU }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// delete category API function
const deleteCategoryService = async (id: number, token: string) => {
    const {data} = await Axios.delete(`/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// update category API function
const updateCategoryService = async (id: string, title: string, token: string) => {
    const {data} = await Axios.put(`/categories/${id}`, title, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

export {
    getCategoriesService,
    createCategoryService,
    deleteCategoryService,
    updateCategoryService,
};