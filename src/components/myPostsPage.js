import { Container, Grid, Button } from "@mui/material";
import Appbar from "./Appbar";
import MyPosts from "./myPosts";
import Bloggers from "./bloggers";
import { Link } from "react-router-dom";

function MyPostsPage() {
	return (
		<>
			<Appbar />
			<Container
				maxWidth="lg"
				sx={{
					height: "85vh",
					pt: "30px",
				}}
			>
				<Grid container spacing={5}>
					<Grid item xs={12} sm={12} md={8} sx={{}}>
						<MyPosts />
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
						<Button
							variant="contained"
							color="secondary"
							sx={{
								fontSize: "18px",
								textTransform: "none",
								background:
									"linear-gradient(108.51deg, #F219A1 53.69%, #AD0CF8 100.22%, #FE007E 100.23%)",
							}}
						>
							<Link
								style={{ textDecoration: "none", color: "inherit" }}
								to="/create-post"
							>
								Create a new post
							</Link>
						</Button>
						<Bloggers />
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default MyPostsPage;
