import React, { useContext } from "react";
import { AllUsers } from "../contexts/allUsersContext";
import { Stack, Paper, Typography, Box } from "@mui/material";

const Bloggers = () => {
	const [users, setUsers] = useContext(AllUsers);

	return (
		<Paper
			elevation={5}
			sx={{
				borderRadius: "15px",
				p: "20px",
				pl: "40px",
				mt: "30px",
				maxHeight: "50vh",
				background: "#9A0F98",
				color: "#fff",
			}}
		>
			<Box>
				<Typography
					variant="h5"
					component="h3"
					sx={{
						fontWeight: 700,
						mb: "10px",
					}}
				>
					All our bloggers
				</Typography>
				<Box
					sx={{
						maxHeight: "45vh",
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
						direction="column"
						justifyContent="center"
						alignItems="flex-start"
						spacing={2}
					>
						{users &&
							users.map((user) => (
								<Typography
									key={user.id}
									variant="h6"
									component="div"
									sx={{ opacity: "0.7" }}
								>
									{user.name}
								</Typography>
							))}
					</Stack>
				</Box>
			</Box>
		</Paper>
	);
};

export default Bloggers;
