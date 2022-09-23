import React, { useEffect, useState } from "react";
import {
	Stack,
	Typography,
	Card,
	Box,
	Backdrop,
	CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import CapitalizeFirstLetter from "./capitalize";

const BlogBody = () => {
	const params = useParams();

	const [single, setSingle] = useState({});

	const [open, setOpen] = useState(false);

	const fetchSingle = async () => {
		setOpen(true);
		const res = await axios.get(
			`https://jsonplaceholder.typicode.com/posts/${parseInt(params.id)}`
		);
		const data = await res.data;
		setTimeout(() => {
			setSingle(data);
			setOpen(false);
		}, 1000);
	};

	useEffect(() => {
		fetchSingle();
	}, []);

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
				<Box
					sx={{
						maxHeight: "55vh",
						overflow: "auto",
						"&::-webkit-scrollbar": {
							width: "12px",
						},
						"&::-webkit-scrollbar-thumb": {
							background: "#6c67b5",
							borderRadius: "5px",
						},
					}}
				>
					<Stack
						direction="column"
						justifyContent="center"
						alignItems="flex-start"
						//divider={<Divider flexItem />}
						spacing={2}
						sx={{ mt: "20px" }}
					>
						<Typography variant="h4" component="div">
							{CapitalizeFirstLetter(single.title)}
						</Typography>
						<Typography variant="h6" component="div" sx={{ opacity: "0.7" }}>
							{CapitalizeFirstLetter(single.body)}
						</Typography>
					</Stack>
				</Box>
			</Card>
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
};

export default BlogBody;
