import React, { useEffect, useState } from "react";
import {
	Button,
	Typography,
	Stack,
	OutlinedInput,
	Container,
	Backdrop,
	CircularProgress,
} from "@mui/material";
import Appbar from "./Appbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CapitalizeFirstLetter from "./capitalize";

function EditPost() {
	const [currentPost, setCurrentPost] = useState({});

	const navigate = useNavigate();

	const params = useParams();

	const [open, setOpen] = useState(false);

	const getPost = async () => {
		setOpen(true);
		const res = await axios.get(
			`https://jsonplaceholder.typicode.com/posts/${parseInt(params.id)}`
		);
		const post = res.data;
		setCurrentPost(post);
		setOpen(false);
	};

	useEffect(() => {
		getPost();
	}, []);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			title: CapitalizeFirstLetter(currentPost.title),
			body: CapitalizeFirstLetter(currentPost.body),
		},
		validationSchema: Yup.object({
			title: Yup.string()
				.required("Required")
				.min(5, "At least 1 word!")
				.matches("^[a-z A-Z _]+([a-z A-Z _]+)*$", "No numbers allowed!"),
			body: Yup.string().required("Required").min(15, "At least one line!"),
		}),
		onSubmit: (values) => {
			editPost(values);
			console.log(values);
		},
	});

	const editPost = async (values) => {
		try {
			setOpen(true);
			await axios.patch(
				`https://jsonplaceholder.typicode.com/users/${currentPost.id}`,
				values
			);

			toast.success(`Post Edited Successfully`);
			setOpen(false);
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
						<Typography
							variant="h5"
							sx={{
								color: "#fff",
							}}
						>
							Title:
						</Typography>
						<OutlinedInput
							id="title"
							placeholder="Post Title"
							value={formik.values.title}
							onChange={formik.handleChange}
							name="title"
							onBlur={formik.handleBlur}
							variant="outlined"
							inputProps={{
								style: {
									border: "2px solid #C4C4C4",
									color: "#fff",
									borderColor:
										formik.touched.title && formik.errors.title
											? "#ff0000"
											: "#C4C4C4",
									borderRadius: "5px",
								},
								"&:hover": {
									outline: "none",
									borderColor: "transparent",
								},
							}}
							sx={{
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
								mt: "30px",
								color: "#fff",
							}}
						>
							Body:
						</Typography>
						<OutlinedInput
							id="body"
							multiline
							placeholder="Post Body"
							rows={7}
							value={formik.values.body}
							onChange={formik.handleChange}
							name="body"
							dense={false}
							onBlur={formik.handleBlur}
							inputProps={{
								style: {},
							}}
							sx={{
								border: "2px solid #C4C4C4",
								color: "#fff",
								borderColor:
									formik.touched.body && formik.errors.body
										? "#ff0000"
										: "#C4C4C4",
								borderRadius: "5px",
								// "& .MuiOutlinedInput-root": {
								// 	border: "2px solid #C4C4C4",
								// 	color: "#fff",
								// 	borderColor:
								// 		formik.touched.title && formik.errors.title
								// 			? "#ff0000"
								// 			: "#C4C4C4",
								// 	borderRadius: "5px",
								// 	// },
								// },
								"& ::-webkit-input-placeholder": {
									color: "#fff",
								},
								"& .MuiOutlinedInput-root:hover": {
									outline: "none",
									borderColor: "transparent",
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
							sx={{
								textTransform: "none",
								fontSize: "18px",
								background:
									"linear-gradient(108.51deg, #F219A1 53.69%, #AD0CF8 100.22%, #FE007E 100.23%)",
							}}
						>
							Update Post
						</Button>
					</Stack>
				</form>
			</Container>
			<Backdrop
				sx={{
					color: "#fff",
					margin: 0,
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={open}
			>
				<CircularProgress
					sx={{
						color: "#1597BB",
					}}
				/>
			</Backdrop>
		</>
	);
}

export default EditPost;
