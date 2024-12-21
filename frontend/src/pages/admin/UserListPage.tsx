import React from "react";
import { Button, Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../slices/usersApiSlice";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";

const UserListPage = () => {
  const { data: users, refetch, isLoading, error } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isLoadingDeleteUser }] =
    useDeleteUserMutation();
  const deleteHandler = async (userId: string) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await deleteUser(userId).unwrap();
        toast.success(res.message);
        refetch();
      } catch (err) {
        toast.error((err as any)?.data?.message || (err as any).error);
      }
    }
  };
  return (
    <>
      <h1>Users</h1>
      {isLoadingDeleteUser && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error as any}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/users/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListPage;
