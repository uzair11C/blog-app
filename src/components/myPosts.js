import React, { useContext, useState } from "react";
import {
	Stack,
	Divider,
	Typography,
	Card,
	Box,
	IconButton,
	Backdrop,
	CircularProgress,
	useTheme,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TablePagination,
} from "@mui/material";
import { AllPosts } from "../contexts/allPostsContext";
import { CurrentUser } from "../contexts/currentUserContext";
import { Link } from "react-router-dom";
import { Delete, CreateTwoTone } from "@mui/icons-material";
import axios from "axios";
import CapitalizeFirstLetter from "./capitalize";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";

function TablePaginationActions(props) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
				sx={{
					color: "#fff",
				}}
			>
				{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
				sx={{
					color: "#fff",
				}}
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
				sx={{
					color: "#fff",
				}}
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
				sx={{
					color: "#fff",
				}}
			>
				{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

function MyPosts() {
	const posts = useContext(AllPosts);
	const [currentUser, setCurrentUser] = useContext(CurrentUser);

	const myPosts = posts.filter((post) => post.userId === currentUser.id);

	const [page, setPage] = useState(0);

	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - myPosts.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const [open, setOpen] = useState(false);

	const deletePost = async (id) => {
		try {
			setOpen(true);
			await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
			setOpen(false);
			toast.success(`Post Deleted Successfully!`);
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
					height: "60vh",
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
				<Table>
					<TableBody>
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
								justifyContent="center"
								alignItems="flex-start"
								divider={
									<Divider
										sx={{ backgroundColor: "#414152", height: "1px" }}
										flexItem
									/>
								}
								spacing={1}
								sx={{ mt: "20px", width: "100%" }}
							>
								{(rowsPerPage > 0
									? myPosts.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
									  )
									: myPosts
								).map((post) => (
									<Box
										sx={{
											height: "40px",
											width: "inherit",
										}}
										key={post.id}
									>
										<Stack
											direction="row"
											spacing={3}
											justifyContent="space-between"
											alignItems="flex-start"
											sx={{ width: "inherit" }}
										>
											<Typography
												key={post.id}
												component="div"
												sx={{
													letterSpacing: "0.1rem",
													textDecoration: "none",
													color: "#fff",
													opacity: "0.7",
													fontSize: "16px",
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
												alignItems="flex-start"
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
									</Box>
								))}
								{emptyRows > 0 && (
									<TableRow style={{ height: 53 * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</Stack>
						</Box>
						<Stack justifyContent={"center"} alignItems={"center"}>
							<Divider
								sx={{ backgroundColor: "#414152", height: "1px" }}
								flexItem
							/>
							<TablePagination
								rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
								colSpan={3}
								count={myPosts.length}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: {
										"aria-label": "rows per pages",
									},
									native: true,
								}}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
								sx={{
									color: "#fff",
									"& .MuiTablePagination-selectIcon": {
										color: "#fff",
									},
								}}
							/>
						</Stack>
					</TableBody>
				</Table>
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
					disableShrink
				/>
			</Backdrop>
		</>
	);
}

export default MyPosts;
