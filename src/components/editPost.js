import React, { useEffect, useState } from "react";
import { Button, Typography, Stack, TextField, Container } from "@mui/material";
import Appbar from "./Appbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditPost() {
	const [currentPost, setCurrentPost] = useState({});

	const navigate = useNavigate();

	const params = useParams();

	const getPost = async () => {
		const res = await axios.get(
			`https://jsonplaceholder.typicode.com/posts/${parseInt(params.id)}`
		);
		const post = res.data;
		setCurrentPost(post);
		console.log(currentPost);
	};

	useEffect(() => {
		getPost();
	}, []);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			title: currentPost.title,
			body: currentPost.body,
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
			editPost(values);
			console.log(values);
		},
	});

	const editPost = async (values) => {
		try {
			const res = await axios.patch(
				`https://jsonplaceholder.typicode.com/users/${currentPost.id}`,
				values
			);
			toast.success(`Post Edited with success code ${res.status}`);
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
						spacing={1}
						sx={{ width: "inherit" }}
					>
						<Typography variant="h4">Title:</Typography>
						<TextField
							id="title"
							placeholder="Post Title"
							style={{ marginBottom: "40px" }}
							value={formik.values.title}
							onChange={formik.handleChange}
							name="title"
							sx={{
								"& .MuiOutlinedInput-root fieldset": {
									border: "2px solid #C4C4C4",
									borderColor:
										formik.touched.title && formik.errors.title
											? "#ff0000"
											: "#C4C4C4",
								},
							}}
						/>
						<Typography variant="h4">Body:</Typography>
						<TextField
							id="body"
							multiline
							placeholder="Post Body"
							rows={7}
							value={formik.values.body}
							onChange={formik.handleChange}
							style={{ marginBottom: "15px" }}
							name="body"
							sx={{
								"& .MuiOutlinedInput-root fieldset": {
									border: "2px solid #C4C4C4",
									borderColor:
										formik.touched.body && formik.errors.body
											? "#ff0000"
											: "#C4C4C4",
								},
							}}
						/>
						<Button type="submit" variant="contained" color="warning">
							Update Post
						</Button>
					</Stack>
				</form>
			</Container>
		</>
	);
}

export default EditPost;
