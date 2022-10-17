import {
	Card,
	Container,
	Typography,
	Box,
	Stack,
	Avatar,
	Pagination,
	Select,
	FormControl,
	MenuItem,
	IconButton,
	Backdrop,
	CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Appbar from "./Appbar";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaginationDemo = () => {
	const [page, setPage] = useState(1);
	const [rusers, setRusers] = useState({});
	const [perPage, setPerPage] = useState(6);
	const [open, setOpen] = useState(false);

	const fetchRusers = async (page, perPage) => {
		const res = await axios.get(
			`https://reqres.in/api/users?page=${page}&per_page=${perPage}`
		);
		const data = await res.data;
		setRusers(data);
	};

	const handleChange = (event) => {
		setPerPage(parseInt(event.target.value));
		setPage(1);
		fetchRusers(page, perPage);
	};

	const deleteUser = async (id) => {
		try {
			setOpen(true);
			await axios.delete(`https://reqres.in/api/users/${id}`);
			setOpen(false);
			toast.success(`User Deleted Successfully!`);
			setPage(1);
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

	useEffect(() => {
		fetchRusers(page, perPage);
	}, [page, perPage]);

	// useEffect(() => {
	// 	setPage(1);
	// 	fetchRusers(page, perPage);
	// 	console.log(rusers.data);
	// }, [perPage]);

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
						width: "45vw",
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
					<Stack
						direction="column"
						justifyContent="center"
						alignItems="stretch"
					>
						<Box
							sx={{
								p: "30px",
								height: "40vh",
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
							{rusers.data &&
								rusers.data.map((user) => (
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
										<IconButton
											aria-label="delete"
											size="large"
											sx={{ color: "#FF0000" }}
											onClick={() => {
												deleteUser(user.id);
											}}
										>
											<Delete fontSize="medium" />
										</IconButton>
									</Stack>
								))}
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								p: "20px",
							}}
						>
							<Stack
								direction="row"
								justifyContent="flex-start"
								alignItems="stretch"
								sx={{ mb: "10px" }}
							>
								<Typography>Per-Page: &nbsp;&nbsp;</Typography>
								<FormControl
									sx={{
										maxHeight: "15px",
										minWidth: 75,
										color: "black",
									}}
									size="small"
								>
									<Select
										labelId="demo-simple-select-autowidth-label"
										id="demo-simple-select-autowidth"
										value={perPage}
										onChange={handleChange}
										sx={{
											maxHeight: "30px",
											fontSize: "14px",
											color: "#858688",
											background: "#FFFFFF",
											borderColor: "1px solid rgba(133, 134, 136, 0.16)",
											".MuiSelect-icon": { color: "#858688" },
										}}
									>
										<MenuItem value={2}>Two</MenuItem>
										<MenuItem value={4}>Four</MenuItem>
										<MenuItem value={6}>Six</MenuItem>
									</Select>
								</FormControl>
							</Stack>
							<Pagination
								size="large"
								count={rusers.total_pages}
								page={page}
								onChange={(e, value) => {
									setPage(value);
								}}
								row
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
					</Stack>
				</Card>
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
					disableShrink
				/>
			</Backdrop>
		</>
	);
};

export default PaginationDemo;
