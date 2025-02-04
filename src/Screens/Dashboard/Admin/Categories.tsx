import React, {useEffect, useState} from "react";
import {HiPlusCircle} from "react-icons/hi";
import Table2 from "../../../components/Table2";
import SideBar from "../SideBar";
import CategoryModal from "../../../components/Modals/CategoryModal";
import {useDispatch, useSelector} from "react-redux";
import {deleteCategoryAction} from "../../../Redux/Actions/CategoriesActions";
import Loader from "../../../components/Notfications/Loader";
import { Empty } from "../../../components/Notfications/Empty";
import toast from "react-hot-toast";

function Categories() {
    const [modalOpen, setModalOpen] = useState(false);
    const [category, setCategory] = useState();
    const dispatch = useDispatch();

    // all categories
    const {categories, isLoading} = useSelector(
        // @ts-ignore
        (state) => state.categoryGetAll
    );
    // delete category
    // @ts-ignore
    const {isSuccess, isError} = useSelector((state) => state.categoryDelete);
    const adminDeletecategory = (id: number) => {
        if (window.confirm("Are you sure you want to delete this category")) {
            // @ts-ignore
            dispatch(deleteCategoryAction(id));
        }
    };

    const OnEditFunction = (id: React.SetStateAction<undefined>) => {
        setCategory(id);
        setModalOpen(!modalOpen);
    };

    useEffect(() => {
        if (isError) {
            toast.error(isError);
            dispatch({type: "DELETE_CATEGORY_RESET"});
        }
        if (isSuccess) {
            dispatch({type: "DELETE_CATEGORY_RESET"});
        }

        if (modalOpen === false) {
            // @ts-ignore
            setCategory()
        }
    }, [modalOpen, dispatch, isError, isSuccess]);

    return (
        <SideBar>
            <CategoryModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                category={category}
            />
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className="text-xl font-bold">Categories</h2>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded"
                    >
                        <HiPlusCircle/> Create
                    </button>
                </div>

                {isLoading ? (
                    <Loader/>
                ) : categories?.length > 0 ? (
                    <Table2
                        data={categories}
                        users={false}
                        OnEditFunction={OnEditFunction}
                        onDeleteFunction={adminDeletecategory}
                    />
                ) : (
                    <Empty message="You have no categories"/>
                )}
            </div>
        </SideBar>
    );
}

export default Categories

// new