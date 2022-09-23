import React, { useContext, useState } from "react";
import {
	Stack,
	Divider,
	Typography,
	Card,
	Box,
	useTheme,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TablePagination,
	IconButton,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";
import { AllPosts } from "../contexts/allPostsContext";
import { Link } from "react-router-dom";
import CapitalizeFirstLetter from "./capitalize";
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

const PostsComp = () => {
	const posts = useContext(AllPosts);

	const [page, setPage] = useState(0);

	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
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
					Latest Posts for You:
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
								sx={{ mt: "20px" }}
							>
								{(rowsPerPage > 0
									? posts.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
									  )
									: posts
								).map((post) => (
									<Box
										sx={{
											height: "40px",
										}}
										key={post.id}
									>
										<Typography
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
												to={`/post/${post.id}`}
											>
												{CapitalizeFirstLetter(post.title)}
											</Link>
										</Typography>
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
								count={posts.length}
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
		</>
	);
};

export default PostsComp;
