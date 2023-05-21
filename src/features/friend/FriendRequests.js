// import React, { useEffect, useState } from "react";
// import {
//   Stack,
//   Typography,
//   Card,
//   Box,
//   Pagination,
//   Grid,
//   Container,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { getFriendRequests } from "./friendSlice";
// import UserCard from "./UserCard";
// import SearchInput from "../../components/SearchInput";

// function FriendRequests() {
//   const [filterName, setFilterName] = useState("");
//   const [page, setPage] = React.useState(1);

//   const { currentPageUsers, usersById, totalUsers, totalPages } = useSelector(
//     (state) => state.friend
//   );
//   const users = currentPageUsers.map((userId) => usersById[userId]);
//   const dispatch = useDispatch();

//   const handleSubmit = (searchQuery) => {
//     setFilterName(searchQuery);
//   };

//   useEffect(() => {
//     dispatch(getFriendRequests({ filterName, page }));
//   }, [filterName, page, dispatch]);

//   return (
//     <Container>
//       <Typography variant="h4" sx={{ mb: 3 }}>
//         Friend Requests
//       </Typography>
//       <Card sx={{ p: 3 }}>
//         <Stack spacing={2}>
//           <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
//             <SearchInput handleSubmit={handleSubmit} />
//             <Box sx={{ flexGrow: 1 }} />
//             <Typography
//               variant="subtitle"
//               sx={{ color: "text.secondary", ml: 1 }}
//             >
//               {totalUsers > 1
//                 ? `${totalUsers} requests found`
//                 : totalUsers === 1
//                 ? `${totalUsers} request found`
//                 : "No request found"}
//             </Typography>

//             <Pagination
//               count={totalPages}
//               page={page}
//               onChange={(e, page) => setPage(page)}
//             />
//           </Stack>
//         </Stack>

//         <Grid container spacing={3} my={1}>
//           {users.map((user) => (
//             <Grid key={user._id} item xs={12} md={4}>
//               <UserCard profile={user} />
//             </Grid>
//           ))}
//         </Grid>
//       </Card>
//     </Container>
//   );
// }

// export default FriendRequests;

import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Card,
  Box,
  TablePagination,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./friendSlice";
import UserTable from "./UserTable";
import SearchInput from "../../components/SearchInput";

function FriendRequests() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { currentPageUsers, usersById, totalUsers } = useSelector(
    (state) => state.friend
  );
  const users = currentPageUsers
    .map((userId) => usersById[userId])
    .filter((user) => user.friendship);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  useEffect(() => {
    dispatch(getUsers({ filterName, page: page + 1, limit: rowsPerPage }));
  }, [filterName, page, rowsPerPage, dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Requests
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />

            {/* <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalUsers > 1
                ? `${totalUsers} users found`
                : totalUsers === 1
                ? `${totalUsers} user found`
                : "No user found"}
            </Typography> */}

            <Box sx={{ flexGrow: 1 }} />

            <TablePagination
              sx={{
                "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon":
                  {
                    display: { xs: "none", md: "block" },
                  },
              }}
              component="div"
              count={totalUsers ? totalUsers : 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
          <UserTable users={users} />
        </Stack>
      </Card>
    </Container>
  );
}

export default FriendRequests;
