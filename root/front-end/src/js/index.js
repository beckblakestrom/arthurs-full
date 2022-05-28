import {
	React,
	useState,
	UserContext,
	Route,
	Routes,
	HashRouter,
} from "./context";
import Home from "./pages/home";
import Nav from "./components/nav";
import CreateAccount from "./components/createaccount";
import Balance from "./components/balance";
import Deposit from "./components/deposit";

export default function Spa() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState("");
	const [currentUserIndex, setCurrentUserIndex] = useState(0);
	const [currentUserAccount, setCurrentUserAccount] = useState({});
	const [user, setUser] = useState({
		users: [
			{
				firstName: "Blake",
				lastName: "Beckstrom",
				email: "blake@gmail.com",
				password: "hard",
				type: "personal",
				accounts: {
					checking: {
						balance: 0,
						transactions: [
							{
								type: "deposit",
								date: "3/27/2022",
								amount: 1,
								transactionId: "blakebeckstrom-checking-001",
							},
							{
								type: "withdraw",
								date: "3/28/2022",
								amount: 1,
								transactionId: "blakebeckstrom-checking-002",
							},
						],
					},
					savings: {
						balance: 0,
						transactions: [
							{
								type: "deposit",
								date: "3/27/2022",
								amount: 1,
								transactionId: "blakebeckstrom-savings-001",
							},
							{
								type: "withdraw",
								date: "3/28/2022",
								amount: 1,
								transactionId: "blakebeckstrom-savings-002",
							},
						],
					},
				},
			},
		],
	});
	return (
		<HashRouter>
			<UserContext.Provider
				value={{
					user,
					setUser,
					loggedIn,
					setLoggedIn,
					currentUser,
					setCurrentUser,
					currentUserIndex,
					setCurrentUserIndex,
					currentUserAccount,
					setCurrentUserAccount,
				}}>
				<Nav />
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/balance/" element={<Balance />} />
					<Route path="/createaccount/" element={<CreateAccount />} />
					<Route path="/deposit/" element={<Deposit />} />
				</Routes>
			</UserContext.Provider>
		</HashRouter>
	);
}
