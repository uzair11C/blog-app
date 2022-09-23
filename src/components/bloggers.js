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
				background:
					" url(frosted-glass-texture-as-background-frosted-glass-texture-as-background-interior-design-decoration-111091129.jpg), linear-gradient(253.09deg, rgba(217, 217, 217, 0.15) -7.53%, rgba(217, 217, 217, 0) 97.04%)",
				backdropFilter: "blur(50px)",
				overflow: "hidden",
				border: "0.5px solid #E2E2E21D",
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
							background: "rgba(221, 217, 219, 0.5)",
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
