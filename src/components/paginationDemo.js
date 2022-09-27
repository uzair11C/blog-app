import {
	Card,
	Container,
	Typography,
	Box,
	Stack,
	Avatar,
	Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Appbar from "./Appbar";
import axios from "axios";

const PaginationDemo = () => {
	const [page, setPage] = useState(1);
	const [rusers, setRusers] = useState([]);

	const fetchRusers = async () => {
		const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
		const data = await res.data;
		setRusers(data.data);
		console.log(rusers);
	};

	useEffect(() => {
		fetchRusers();
	}, [page]);

	return (
		<>
			<Appbar />
			<Container
				maxWidth="md"
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "89vh",
					p: "30px",
				}}
			>
				<Card
					raised
					sx={{
						mt: "30px",
						p: "30px",
						pb: "40px",
						height: "60vh",
						background:
							" url(frosted-glass-texture-as-background-frosted-glass-texture-as-background-interior-design-decoration-111091129.jpg), linear-gradient(253.09deg, rgba(217, 217, 217, 0.15) -7.53%, rgba(217, 217, 217, 0) 97.04%)",
						backdropFilter: "blur(50px)",
						overflow: "hidden",
						border: "0.5px solid #E2E2E21D",
						color: "#fff",
						borderRadius: "15px",
						width: "40vw",
					}}
				>
					<Typography
						variant="h5"
						component="h2"
						sx={{
							fontWeight: 700,
						}}
					>
						All Req-Res Users:
					</Typography>
					<Box
						sx={{
							p: "30px",
							height: "43vh",
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
						{rusers &&
							rusers.map((user) => (
								<Stack
									direction="row"
									justifyContent="flex-start"
									alignItems="center"
									spacing={3}
									key={user.id}
									sx={{
										mt: "15px",
										mb: "15px",
									}}
								>
									<Avatar
										alt={user.first_name}
										src={user.avatar}
										sx={{
											width: "50px",
											height: "50px",
										}}
									/>
									<Stack
										direction="column"
										justifyContent="flex-start"
										alignItems="flex-start"
									>
										<Typography
											sx={{
												letterSpacing: "0.1rem",
												color: "#fff",
												opacity: "0.7",
												fontSize: "16px",
											}}
										>
											{user.first_name} {user.last_name}
										</Typography>
										<Typography
											sx={{
												letterSpacing: "0.1rem",
												color: "#fff",
												opacity: "0.7",
												fontSize: "12px",
											}}
										>
											{user.email}
										</Typography>
									</Stack>
								</Stack>
							))}
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Pagination
							size="large"
							count={2}
							onChange={(e, value) => {
								setPage(value);
							}}
							sx={{
								"& .MuiPaginationItem-text": {
									color: "#fff",
								},
								"& .MuiPaginationItem-root.Mui-selected": {
									background:
										"linear-gradient(108.51deg, #F219A1 53.69%, #AD0CF8 100.22%, #FE007E 100.23%)",
								},
							}}
						/>
					</Box>
				</Card>
			</Container>
		</>
	);
};

export default PaginationDemo;
