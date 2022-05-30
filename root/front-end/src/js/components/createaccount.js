import { React, useContext, useState, UserContext, Link } from "../context";

export default function CreateAccount() {
	const [show, setShow] = useState(true);
	const [status, setStatus] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {
		user,
		setUser,
		loggedIn,
		setLoggedIn,
		currentUser,
		setCurrentUser,
		currentUserIndex,
		setCurrentUserIndex,
	} = useContext(UserContext);

	let capitalFirst = firstName.charAt(0).toUpperCase() + firstName.slice(1);

	function validate(field, label, event) {
		if (!field) {
			return false;
		} else {
			for (let i = 0; i < user.users.length; i++) {
				if (email === user.users[i].email) {
					event.preventDefault();
					alert(`user already exists`);
					clearForm();
				} else {
					return true;
				}
			}
		}
	}

	function handleCreate() {
		console.log(firstName, lastName, email, password);
		if (!validate(firstName, "firstName")) return;
		if (!validate(lastName, "lastName")) return;
		if (!validate(email, "email")) return;
		if (!validate(password, "password")) return;
		user.users.push({
			firstName,
			lastName,
			email,
			password,
			type: "personal",
			accounts: {
				checking: {
					title: "checking",
					balance: 0,
					transactions: [],
				},
				savings: {
					title: "savings",
					balance: 0,
					transactions: [],
				},
			},
		});
		setShow(false);
		setLoggedIn(true);
		thisUser();
	}

	function thisUser() {
		for (let i = 0; i < user.users.length; i++) {
			if (
				email === user.users[i].email &&
				password === user.users[i].password
			) {
				let thisUser = user.users[i];
				setCurrentUserIndex(i);
				console.log(currentUserIndex);
				setCurrentUser(thisUser);
				return;
			} else {
				continue;
			}

			// does not match user.users[0], so not a match and then it runs again and is a match
		}
	}
	function clearForm() {
		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
		setShow(true);
	}
	return show ? (
		<div className="half-page-container">
			<div className="form_container">
				<form className="form">
					<h1>Create Account</h1>
					<div className="form_section">
						<input
							type="text"
							name="firstName"
							id="firstName"
							className="form_input"
							placeholder="First Name"
							value={firstName}
							onChange={(e) => setFirstName(e.currentTarget.value)}
							required
						/>
						<label htmlFor="name" className="form_label">
							First Name
						</label>
						<div className="form_input-validator"></div>
						<svg
							className="form_check"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24">
							<path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" />
						</svg>
					</div>
					<div className="form_section">
						<input
							type="text"
							name="lastname"
							id="lastname"
							className="form_input"
							placeholder="Last Name"
							value={lastName}
							onChange={(e) => setLastName(e.currentTarget.value)}
							required
						/>
						<label htmlFor="lastName" className="form_label">
							Last Name
						</label>
						<div className="form_input-validator"></div>
						<svg
							className="form_check"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24">
							<path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" />
						</svg>
					</div>
					<div className="form_section">
						<input
							type="email"
							name="email"
							id="email"
							className="form_input form_input-email"
							placeholder="Email Address"
							required
							autoComplete="email"
							value={email}
							onChange={(e) => setEmail(e.currentTarget.value)}
						/>
						<label htmlFor="email" className="form_label">
							Email Address
						</label>
						<div className="form_input-validator"></div>
						<svg
							className="form_check"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24">
							<path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" />
						</svg>
					</div>
					<div className="form_section">
						<input
							type="password"
							name="password"
							id="password"
							className="form_input"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.currentTarget.value)}
							required
						/>
						<label htmlFor="password" className="form_label">
							Password
						</label>
						<div className="form_input-validator"></div>
						<svg
							className="form_check"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24">
							<path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" />
						</svg>
					</div>

					<button onClick={handleCreate} className="submit" type="submit">
						Create Account
					</button>
					<div className="need-create">
						<h1 className="need-create-title">Already have an account?</h1>
						<p
							className="need-create-link"
							onClick={() => {
								document
									.getElementById("login-dropdown")
									.classList.toggle("drop");
								document
									.getElementById("login-button")
									.classList.toggle("show");
								document.getElementById("down-arrow").classList.toggle("show");
							}}>
							Login
						</p>
					</div>
				</form>
			</div>
		</div>
	) : (
		<div className="full-page-container">
			<div className="login-success">
				<h5>Welcome {capitalFirst}.</h5>
				<h5>Thank you for choosing Arthurs.</h5>
				<Link to="/deposit/" className="submit">
					Make your first deposit
				</Link>
				<button onClick={clearForm} className="submit" type="submit">
					Add Another Account
				</button>
			</div>
		</div>
	);
}
