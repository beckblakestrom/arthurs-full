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
				accountType: "personal",
				balance: 200000,
				accounts: {
					checking: {
						title: "Checking",
						transactions: [
							{
								type: "deposit",
								account: "checking",
								date: "3/27/2022",
								amount: 1,
							},
							{
								type: "withdraw",
								account: "checking",
								date: "3/28/2022",
								amount: 1,
							},
						],
						balance: 50000,
					},
					savings: {
						title: "Savings",
						transactions: [
							{
								type: "deposit",
								account: "checking",
								date: "3/27/2022",
								amount: 1,
							},
							{
								type: "withdraw",
								account: "checking",
								date: "3/28/2022",
								amount: 1,
							},
						],
						balance: 50000,
					},
					credit: {
						title: "Credit",
						transactions: [
							{
								type: "deposit",
								account: "checking",
								date: "3/27/2022",
								amount: 1,
							},
							{
								type: "withdraw",
								account: "checking",
								date: "3/28/2022",
								amount: 1,
							},
						],
						balance: 50000,
					},
					trading: {
						title: "Trading",
						transactions: [
							{
								type: "deposit",
								account: "checking",
								date: "3/27/2022",
								amount: 1,
							},
							{
								type: "withdraw",
								account: "checking",
								date: "3/28/2022",
								amount: 1,
							},
						],
						balance: 60000,
					},
				},
				transactions: [
					{ type: "deposit", date: "3/27/2022", amount: 45 },
					{ type: "withdraw", date: "3/28/2022", amount: 46 },
				],
			},
			{
				firstName: "John",
				lastName: "Doe",
				email: "john@gmail.com",
				password: "easy",
				accountType: "Small Business",
				balance: 200,
				accounts: {
					checking: {
						transactions: [
							{ type: "deposit", date: "3/27/2022", amount: 1 },
							{ type: "withdraw", date: "3/28/2022", amount: 2 },
						],
						balance: 60,
					},
					savings: {
						transactions: [
							{ type: "deposit", date: "3/27/2022", amount: 3 },
							{ type: "withdraw", date: "3/28/2022", amount: 4 },
						],
						balance: 50,
					},
					credit: {
						transactions: [
							{ type: "deposit", date: "3/27/2022", amount: 5 },
							{ type: "withdraw", date: "3/28/2022", amount: 6 },
						],
						balance: 50,
					},
					trading: {
						transactions: [
							{ type: "deposit", date: "3/27/2022", amount: 7 },
							{ type: "withdraw", date: "3/28/2022", amount: 8 },
						],
						balance: 50,
					},
				},
				transactions: [
					{ type: "deposit", date: "3/27/2022", amount: 45 },
					{ type: "withdraw", date: "3/28/2022", amount: 46 },
				],
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
				</Routes>
			</UserContext.Provider>
		</HashRouter>
	);
}
