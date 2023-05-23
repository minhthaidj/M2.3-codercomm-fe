import React, { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Card, Stack, alpha } from "@mui/material";
import { useForm } from "react-hook-form";

import * as Yup from "yup";
import { FTextField, FUploadImage, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "./postSlice";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
  image: "",
};

function PostEdit({ post = defaultValues, handleUpdateButtonClicked }) {
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: { ...post },
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting, isDirty },
  } = methods;

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.post);

  const onSubmit = (data) => {
    dispatch(editPost(data));
    handleUpdateButtonClicked();
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
          { shouldDirty: true }
        );
      }
    },
    [setValue]
  );

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name={"content"}
            multiline
            fullWidth
            rows={4}
            placeholder=""
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />
          <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {isDirty ? (
              <LoadingButton
                type="submit"
                variant="contained"
                size="small"
                loading={isSubmitting || isLoading}
              >
                Update
              </LoadingButton>
            ) : (
              <Button variant="contained" size="small" type="button" disabled>
                Update
              </Button>
            )}
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default PostEdit;
