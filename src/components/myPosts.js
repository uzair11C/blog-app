import React, { useContext } from "react";
import {
	Stack,
	Divider,
	Typography,
	Card,
	Box,
	IconButton,
} from "@mui/material";
import { AllPosts } from "../contexts/allPostsContext";
import { CurrentUser } from "../contexts/currentUserContext";
import { Link } from "react-router-dom";
import { Delete, CreateTwoTone } from "@mui/icons-material";
import axios from "axios";
import CapitalizeFirstLetter from "./capitalize";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyPosts() {
	const posts = useContext(AllPosts);
	const [currentUser, setCurrentUser] = useContext(CurrentUser);

	const myPosts = posts.filter((post) => post.userId === currentUser.id);

	const deletePost = async (id) => {
		try {
			const res = await axios.delete(
				`https://jsonplaceholder.typicode.com/posts/${id}`
			);
			toast.success(`Post ${id} deleted with success code ${res.status}`);
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
		<Card
			raised
			sx={{
				mt: "30px",
				p: "30px",
				pb: "40px",
				maxHeight: "60vh",
				backgroundColor: "#9A0F98",
				color: "#fff",
			}}
		>
			<Typography
				variant="h4"
				component="h2"
				sx={{
					fontWeight: 700,
				}}
			>
				All Your Posts:
			</Typography>
			<Box
				sx={{
					maxHeight: "55vh",
					overflow: "auto",
					"&::-webkit-scrollbar": {
						width: "12px",
					},
					"&::-webkit-scrollbar-thumb": {
						background: "#160040",
						borderRadius: "5px",
					},
				}}
			>
				<Stack
					direction="column-reverse"
					justifyContent="space-between"
					alignItems="flex-start"
					divider={<Divider flexItem />}
					spacing={2}
					sx={{ mt: "20px", width: "100%" }}
				>
					{myPosts &&
						myPosts.map((post) => (
							<Stack
								direction="row"
								spacing={3}
								justifyContent="space-between"
								alignItems="center"
								key={post.id}
								sx={{ width: "inherit" }}
							>
								<Typography
									key={post.id}
									variant="h6"
									component="div"
									sx={{
										letterSpacing: "0.1rem",
										textDecoration: "none",
										color: "#fff",
										opacity: "0.7",
										"&:hover": {
											color: "#160040",
											transition: "0.3s ease-in-out",
										},
									}}
								>
									<Link
										style={{ color: "inherit", textDecoration: "none" }}
										to={`/user/posts/${post.id}`}
									>
										{CapitalizeFirstLetter(post.title)}
									</Link>
								</Typography>
								<Stack
									direction="row"
									justifyContent="center"
									alignItems="center"
									spacing={2}
								>
									<IconButton
										aria-label="edit"
										size="large"
										sx={{ color: "#FFF80A" }}
									>
										<Link
											style={{ color: "inherit", textDecoration: "none" }}
											to={`/edit-post/${post.id}`}
										>
											<CreateTwoTone fontSize="medium" />
										</Link>
									</IconButton>
									<IconButton
										aria-label="delete"
										size="large"
										sx={{ color: "#FF0000" }}
										onClick={() => {
											deletePost(post.id);
										}}
									>
										<Delete fontSize="medium" />
									</IconButton>
								</Stack>
							</Stack>
						))}
				</Stack>
			</Box>
		</Card>
	);
}

export default MyPosts;
