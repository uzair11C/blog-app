import React, { useContext, useState } from "react";
import { Container, Paper, Typography, Button, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CurrentUser } from "../contexts/currentUserContext";
import { AllUsers } from "../contexts/allUsersContext";
// import { Link } from 'react-router-dom'

const inputStyles = {
	padding: "10px",
	borderRadius: "8px",
	border: "1px solid transparent",
};

const Login = () => {
	const [error, setError] = useState("");
	const [users, setUsers] = useContext(AllUsers);
	const [currentUser, setCurrentUser] = useContext(CurrentUser);

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Required"),
			email: Yup.string().email("Invalid Email").required("Required"),
		}),
		onSubmit: () => {
			submitHandler();
		},
	});

	const submitHandler = () => {
		users &&
			users.map((user) => {
				if (user.email === formik.values.email) {
					setCurrentUser({
						...currentUser,
						id: user.id,
						name: user.name,
						email: user.email,
					});
				} else {
					setError("Details do not match");
				}
			});
	};

	return (
		<Container
			maxWidth="lg"
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<Paper
				sx={{
					borderRadius: "20px",
					width: "300px",
					height: "400px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					padding: "20px",
					background:
						" url(frosted-glass-texture-as-background-frosted-glass-texture-as-background-interior-design-decoration-111091129.jpg), linear-gradient(253.09deg, rgba(217, 217, 217, 0.15) -7.53%, rgba(217, 217, 217, 0) 97.04%)",
					backdropFilter: "blur(50px)",
					overflow: "hidden",
					border: "2px solid #E2E2E21D",
					color: "#fff",
				}}
			>
				<Typography
					variant="h3"
					component="div"
					sx={{ textAlign: "left", mb: "30px" }}
				>
					Login
				</Typography>
				<Typography
					variant="p"
					component="p"
					sx={{ textAlign: "left", color: "red" }}
				>
					{error}
				</Typography>
				<form onSubmit={formik.handleSubmit}>
					<Stack spacing={3}>
						<div>
							<label htmlFor="name">
								<Typography variant="h5">Name:</Typography>
							</label>
							<input
								style={inputStyles}
								onBlur={formik.handleBlur}
								type="text"
								id="name"
								name="name"
								placeholder="Name"
								value={formik.values.name}
								onChange={formik.handleChange}
							/>
							{formik.touched.name && formik.errors.name ? (
								<Typography
									variant="subtitle"
									component="p"
									sx={{ color: "red" }}
								>
									{formik.errors.name}
								</Typography>
							) : null}
						</div>

						<div>
							<label htmlFor="email">
								<Typography variant="h5">Email</Typography>
							</label>
							<input
								style={inputStyles}
								onBlur={formik.handleBlur}
								type="email"
								id="email"
								name="email"
								placeholder="Email"
								value={formik.values.email}
								onChange={formik.handleChange}
							/>
							{formik.touched.email && formik.errors.email ? (
								<Typography
									variant="subtitle"
									component="p"
									sx={{ color: "red" }}
								>
									{formik.errors.email}
								</Typography>
							) : null}
						</div>

						<Button
							type="submit"
							variant="contained"
							sx={{
								mt: "10px",
								background:
									"linear-gradient(108.51deg, #F219A1 53.69%, #AD0CF8 100.22%, #FE007E 100.23%)",
							}}
							onSubmit={formik.handleSubmit}
						>
							Submit
						</Button>
						{/* <Typography>
                        Don&#39;t have an account? <Link href='/sign-up'><Button variant='contained' color='success'>Sign-Up!</Button></Link>
                    </Typography> */}
					</Stack>
				</form>
			</Paper>
		</Container>
	);
};

export default Login;
