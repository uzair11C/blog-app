import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserContext } from "./contexts/currentUserContext";
import { AllUsersContext } from "./contexts/allUsersContext";
import { AllPostsContext } from "./contexts/allPostsContext";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<AllUsersContext>
			<CurrentUserContext>
				<AllPostsContext>
					<App />
				</AllPostsContext>
			</CurrentUserContext>
		</AllUsersContext>
	</Router>
);
