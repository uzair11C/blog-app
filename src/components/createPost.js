import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import Appbar from "./Appbar";
import { CurrentUser } from "../contexts/currentUserContext";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreatePost() {
	const navigate = useNavigate();

	const [currentUser, setCurrentUser] = useContext(CurrentUser);

	const createPost = async (values) => {
		try {
			const res = await axios.post(
				"https://jsonplaceholder.typicode.com/posts",
				values
			);
			toast.success(`Post Created with success code ${res.status}`);
			setTimeout(() => {
				navigate("/user/posts", { replace: true });
			}, 1000);
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			title: "",
			body: "",
		},
		validationSchema: Yup.object({
			title: Yup.string()
				.required("Required")
				.min(5, "At least 1 word!")
				.matches("^[a-z A-Z _]+([a-z A-Z _]+)*$", "No numbers allowed!"),
			body: Yup.string()
				.required("Required")
				.min(15, "At least one line!")
				.matches(
					"^[a-z A-Z 0-9 _]+( [a-z A-Z 0-9 _]+)*$",
					"Only numbers and letters!"
				),
		}),
		onSubmit: (values) => {
			console.log(values);
			values.userId = currentUser.id;
			createPost(values);
		},
	});

	return (
		<>
			<Appbar />
			<Container
				maxWidth="md"
				sx={{
					height: "85vh",
					mt: "15px",
					pt: "50px",
				}}
			>
				<form
					onSubmit={formik.handleSubmit}
					style={{
						width: "inherit",
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "stretch",
					}}
				>
					<Stack
						direction="column"
						justifyContent="flex-start"
						alignItems="stretch"
						sx={{ width: "inherit" }}
						spacing={1}
					>
						<Typography
							variant="h5"
							sx={{
								color: "#fff",
							}}
						>
							Title:
						</Typography>
						<TextField
							id="title"
							placeholder="Post Title"
							value={formik.values.title}
							onChange={formik.handleChange}
							name="title"
							onBlur={formik.handleBlur}
							sx={{
								"& .MuiOutlinedInput-root fieldset": {
									border: "2px solid #C4C4C4",
									color: "#fff",
									borderColor:
										formik.touched.title && formik.errors.title
											? "#ff0000"
											: "#C4C4C4",
								},
								"& ::-webkit-input-placeholder": {
									color: "#fff",
								},
								input: {
									color: "#fff",
								},
							}}
						/>
						{formik.touched.title && formik.errors.title ? (
							<Typography
								variant="subtitle"
								component="p"
								sx={{ color: "red" }}
							>
								{formik.errors.title}
							</Typography>
						) : null}
						<Typography
							variant="h5"
							sx={{
								mt: "40px",
								color: "#fff",
							}}
						>
							Body:
						</Typography>
						<TextField
							id="body"
							multiline
							placeholder="Post Body"
							rows={7}
							value={formik.values.body}
							onChange={formik.handleChange}
							name="body"
							onBlur={formik.handleBlur}
							sx={{
								"& .MuiOutlinedInput-root fieldset": {
									border: "2px solid #C4C4C4",
									color: "#fff",
									borderColor:
										formik.touched.title && formik.errors.title
											? "#ff0000"
											: "#C4C4C4",
								},
								"& ::-webkit-input-placeholder": {
									color: "#fff",
								},
								input: {
									color: "#fff",
								},
							}}
						/>
						{formik.touched.body && formik.errors.body ? (
							<Typography
								variant="subtitle"
								component="p"
								sx={{ color: "red" }}
							>
								{formik.errors.body}
							</Typography>
						) : null}
						<Button
							type="submit"
							variant="contained"
							color="warning"
							sx={{
								textTransform: "none",
								mt: "15px",
								fontSize: "18px",
							}}
						>
							Create Post
						</Button>
					</Stack>
				</form>
			</Container>
		</>
	);
}

export default CreatePost;
