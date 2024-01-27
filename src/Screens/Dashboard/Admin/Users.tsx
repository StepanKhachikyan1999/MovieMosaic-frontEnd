import React, {useEffect} from 'react'
import Table2 from '../../../components/Table2'
import SideBar from '../SideBar'
import {useDispatch, useSelector} from 'react-redux'
import {deleteUserAction, getAllUsersAction,} from "../../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from '../../../components/Notfications/Loader'
import {Empty} from "../../../components/Notfications/Empty";

function Users() {
    const dispatch = useDispatch();

    const {isLoading, isError, users} = useSelector(
        // @ts-ignore
        (state) => state.adminGetAllUsers
    );
    // delete
    const {isError: deleteError, isSuccess} = useSelector(
        // @ts-ignore
        (state) => state.adminDeleteUser
    );

    // delete user handler
    const deleteMoviesHandler = (id: string) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            // @ts-ignore
            dispatch(deleteUserAction(id))
        }
    };

    // useEffect
    useEffect(() => {
        // @ts-ignore
        dispatch(getAllUsersAction())
        if (isError || deleteError) {
            toast.error(isError || deleteError);
            dispatch({
                type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET",
            });
        }
    }, [dispatch, isError, deleteError, isSuccess]);

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Users</h2>
                {isLoading ? (
                    <Loader/>
                ) : users?.length > 0 ? (
                    <Table2
                        data={users}
                        users={true}
                        onDeleteFunction={deleteMoviesHandler}
                    />
                ) : (
                    <Empty message="You dont have any user"/>
                )}
            </div>
        </SideBar>
    );
}

export default Users

// new