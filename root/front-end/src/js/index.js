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
import Withdraw from "./components/withdraw";

export default function Spa() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState("");
	const [currentUserIndex, setCurrentUserIndex] = useState(0);
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
						title: "checking",
						balance: 0,
						transactions: [
							{
								type: "deposit",
								date: "3/23/2022",
								amount: 1,
								account: "checking",
								transactionId: "838904",
								timestamp: "3",
							},
							{
								type: "withdraw",
								date: "3/22/2022",
								amount: -1,
								account: "checking",
								transactionId: "456904",
								timestamp: "2",
							},
						],
					},
					savings: {
						title: "savings",
						balance: 0,
						transactions: [
							{
								type: "deposit",
								date: "3/21/2022",
								amount: 1,
								account: "savings",
								transactionId: "138404",
								timestamp: "1",
							},
							{
								type: "withdraw",
								date: "3/20/2022",
								amount: -1,
								account: "savings",
								transactionId: "638954",
								timestamp: "0",
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
				}}>
				<Nav />
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/balance/" element={<Balance />} />
					<Route path="/createaccount/" element={<CreateAccount />} />
					<Route path="/deposit/" element={<Deposit />} />
					<Route path="/withdraw/" element={<Withdraw />} />
				</Routes>
			</UserContext.Provider>
		</HashRouter>
	);
}
