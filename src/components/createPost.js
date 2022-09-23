import {
	Button,
	Container,
	Stack,
	OutlinedInput,
	Typography,
} from "@mui/material";
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
			await axios.post("https://jsonplaceholder.typicode.com/posts", values);
			toast.success(`New Post Created Successfully!`);
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
			body: Yup.string().required("Required").min(15, "At least one line!"),
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
								mt: "40px",
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
								mt: "15px",
								fontSize: "18px",
								background:
									"linear-gradient(108.51deg, #F219A1 53.69%, #AD0CF8 100.22%, #FE007E 100.23%)",
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
