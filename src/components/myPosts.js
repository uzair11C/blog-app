import React, { useContext } from "react";
import {
	Stack,
	Divider,
	Typography,
	Card,
	Box,
	IconButton,
	Backdrop,
	CircularProgress,
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

	const [open, setOpen] = React.useState(false);

	const deletePost = async (id) => {
		try {
			setOpen(true);
			const res = await axios.delete(
				`https://jsonplaceholder.typicode.com/posts/${id}`
			);
			setOpen(false);
			toast.success(`Post ${id} deleted with success code ${res.status}`);
		} catch (error) {
			setOpen(false);
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
			<Card
				raised
				sx={{
					mt: "30px",
					p: "30px",
					pb: "40px",
					maxHeight: "60vh",
					background:
						" url(frosted-glass-texture-as-background-frosted-glass-texture-as-background-interior-design-decoration-111091129.jpg), linear-gradient(253.09deg, rgba(217, 217, 217, 0.15) -7.53%, rgba(217, 217, 217, 0) 97.04%)",
					backdropFilter: "blur(50px)",
					overflow: "hidden",
					border: "0.5px solid #E2E2E21D",
					color: "#fff",
					borderRadius: "15px",
				}}
			>
				<Typography
					variant="h5"
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
							background: "rgba(221, 217, 219, 0.5)",
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
											// "&:hover": {
											// 	color: "#160040",
											// 	transition: "0.3s ease-in-out",
											// },
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
			<Backdrop
				sx={{
					color: "#fff",
					margin: 0,
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				disableShrink
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

export default MyPosts;
