import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers } from "../store/thunks/fetchUsers";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { addUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  ///////////////////states beofre custom hook////////////////////
  // here were the loadingUsers state and error pieces of state before the creation of the custom hook

  //   const [isCreatingUser, setIsCreatingUser] = useState(false);
  //   const [creatingUserError, setcreatingUserError] = useState(null);
  //   const dispatch = useDispatch();

  const { data } = useSelector((state) => {
    return state.users;
  });

  //   to fetch users on component render
  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  /////////////////THE useEffect BEFORE THE CREATING OF CUSTOM HOOK//////////////////////
  //   useEffect(() => {
  //     setIsLoadingUsers(true);
  //     dispatch(fetchUsers())
  //       // unwrap to get normal Promise behavior for the promise returned from dispatch
  //       .unwrap()
  //       //    naturally before the unwrap, the promise returned from this dispatch will run its .then(()=>{})
  //       //     if the request either fails or succeeds.
  //       // But here, when request is only successful (because of the unwrap)
  //       ///////////////////////
  //       //   .then(() => {
  //       // })
  //       // when request only fails (because of the unwrap)
  //       .catch((err) => setLoadingUsersError(err))
  //       // finally wil run anyway
  //       .finally(() => setIsLoadingUsers(false));
  //   }, [dispatch]);

  //    to call add user thunk

  /////////BEFORE CUSTOM HOOK/////////
  const handleUserAdd = () => {
    doCreateUser();
  };
  //   const handleUserAdd = () => {
  //     setIsCreatingUser(true);
  //     dispatch(addUser())
  //       .unwrap()
  //       .catch((err) => setcreatingUserError(err))
  //       .finally(() => setIsCreatingUser(false));
  //   };

  let content;

  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div className="error">Error fetching data... 😥</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>

        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>

        {creatingUserError && "Error creating user..."}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
