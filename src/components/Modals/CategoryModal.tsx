import React, { useEffect, useState } from 'react';
import MainModal from "./MainModal";
import { Input } from "../UsedInputs";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction, updateCategoryAction } from "../../Redux/Actions/CategoriesActions";
import toast from "react-hot-toast";

function CategoryModal({ modalOpen, setModalOpen, category }: any) {
    const [title_ARM, setTitle_ARM] = useState("");
    const [title_ENG, setTitle_ENG] = useState("");
    const [title_RU, setTitle_RU] = useState("");
    const dispatch = useDispatch();

    // @ts-ignore
    const { isLoading, isError, isSuccess } = useSelector((state) => state.categoryCreate);
    // @ts-ignore
    const { isLoading: upLoading, isError: upError, isSuccess: upSuccess } = useSelector((state) => state.categoryUpdate);

    const submitHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (title_ARM && title_ENG && title_RU) {
            const titles = { title_ARM, title_ENG, title_RU };
            if (category) {
                // @ts-ignore
                dispatch(updateCategoryAction(category._id, titles));
                setModalOpen(!modalOpen);
            } else {
                // @ts-ignore
                dispatch(createCategoryAction(title_ARM, title_ENG, title_RU ));
                setTitle_ARM("");
                setTitle_ENG("");
                setTitle_RU("");
                setModalOpen(!modalOpen);
            }
        } else {
            toast.error("Please fill in all title fields");
        }
    };

    useEffect(() => {
        if (upError || isError) {
            toast.error(upError || isError);
            dispatch({
                type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
            });
        }
        if (isSuccess || upSuccess) {
            dispatch({
                type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
            });
        }
        if (category) {
            setTitle_ARM(category.title_ARM);
            setTitle_ENG(category.title_ENG);
            setTitle_RU(category.title_RU);
        }
        if (!modalOpen) {
            setTitle_ARM("");
            setTitle_ENG("");
            setTitle_RU("");
        }
    }, [dispatch, isError, isSuccess, upSuccess, upError, category, modalOpen]);

    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
                <h2 className="text-3xl font-bold">{category ? "Update" : "Create"} Category</h2>
                <form className="flex flex-col gap-6 text-left mt-6" onSubmit={submitHandler}>
                    {['ARM', 'ENG', 'RU'].map((lang) => (
                        <Input
                            key={lang}
                            label={`Category Name (${lang})`}
                            placeholder={`Name in ${lang}`}
                            type="text"
                            bg={false}
                            value={lang === 'ARM' ? title_ARM : lang === 'ENG' ? title_ENG : title_RU}
                            onChange={(e: { target: { value: React.SetStateAction<string> } }) => lang === 'ARM' ? setTitle_ARM(e.target.value) : lang === 'ENG' ? setTitle_ENG(e.target.value) : setTitle_RU(e.target.value)}
                        />
                    ))}
                    <button
                        disabled={isLoading || upLoading}
                        type="submit"
                        className="w-full py-3 text-lg hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
                    >
                        {isLoading || upLoading ? "Loading..." : (category ? "Update" : "Create")}
                    </button>
                </form>
            </div>
        </MainModal>
    );
}

export default CategoryModal;
