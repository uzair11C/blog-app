import React, { useContext } from "react";
import {
	Stack,
	Divider,
	Typography,
	Card,
	Box,
	Pagination,
} from "@mui/material";
import { AllPosts } from "../contexts/allPostsContext";
import { Link } from "react-router-dom";
import CapitalizeFirstLetter from "./capitalize";

const PostsComp = () => {
	const posts = useContext(AllPosts);

	return (
		<>
			<Card
				raised
				sx={{
					mt: "30px",
					p: "30px",
					pb: "40px",
					maxHeight: "63vh",
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
					Latest Posts for You:
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
						justifyContent="center"
						alignItems="flex-start"
						divider={<Divider flexItem />}
						spacing={2}
						sx={{ mt: "20px" }}
					>
						{posts &&
							posts.map((post) => (
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
										to={`/post/${post.id}`}
									>
										{CapitalizeFirstLetter(post.title)}
									</Link>
								</Typography>
							))}
					</Stack>
				</Box>
				{/* <Stack justifyContent={"center"} alignItems={"center"}>
					<Pagination
						count={2}
						//variant="outlined"
						size="large"
						color="primary"
						sx={{
							// background: "#2E0249",
							mb: "50px",
						}}
					/>
				</Stack> */}
			</Card>
		</>
	);
};

export default PostsComp;
