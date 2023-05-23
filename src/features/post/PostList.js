import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { getPosts } from "./postSlice";
import PostEdit from "./PostEdit";

function PostList({ userId }) {
  const [postEdited, setPostEdited] = useState(null);
  const [open, setOpen] = useState(false);
  const handleEditPost = (post) => {
    setPostEdited(post);
    setOpen(true);
  };

  const handleUpdateButtonClicked = () => {
    setOpen(false);
  };

  const [page, setPage] = useState(1);
  const { currentPagePosts, postsById, isLoading, totalPosts } = useSelector(
    (state) => state.post
  );
  const posts = currentPagePosts.map((postId) => postsById[postId]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getPosts({ userId, page }));
  }, [dispatch, userId, page]);

  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          handleEdit={() => {
            handleEditPost(post);
          }}
        />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalPosts ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(totalPosts) && posts.length >= totalPosts}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6">No Post Yet</Typography>
        )}
      </Box>
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={open}
        onClose={() => {}}
      >
        <Box
          sx={{
            width: { xs: "80vw", md: 650 },
          }}
        >
          <PostEdit
            post={postEdited}
            handleUpdateButtonClicked={handleUpdateButtonClicked}
          />
        </Box>
      </Modal>
    </>
  );
}

export default PostList;
