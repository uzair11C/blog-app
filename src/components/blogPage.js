import { Container, Grid } from "@mui/material";
import React from "react";
import Appbar from "./Appbar";
import BlogAuthor from "./blogAuthor";
import BlogBody from "./blogBody";

function BlogPage() {
	return (
		<>
			<Appbar />
			<Container
				sx={{
					height: "85vh",
					pt: "30px",
				}}
			>
				<Grid container spacing={5}>
					<Grid
						item
						xs={12}
						sm={12}
						md={8}
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "stretch",
						}}
					>
						<BlogBody />
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "stretch",
						}}
					>
						<BlogAuthor />
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default BlogPage;
