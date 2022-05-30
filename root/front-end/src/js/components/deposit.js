import { React, useContext, UserContext } from "../context";

// callback function, takes onclick functions
const ATMDeposit = ({ onChange }) => {
	// html return
	return (
		<React.Fragment>
			<label className="input-container">
				{/* value input */}
				<input
					id="depositId"
					placeholder="100"
					className="input"
					type="number"
					min={1}
					onChange={onChange}></input>
				{/* submit button */}
				<input className="deposit-submit" type="submit" value="Submit"></input>
			</label>
		</React.Fragment>
	);
};

export default function Deposit() {
	const { user, setUser, loggedIn, currentUser, currentUserIndex } =
		useContext(UserContext);

	let deposit = 0; // state of this transaction
	const [totalState, setTotalState] = React.useState(0);
	const [currentAccount, setCurrentAccount] = React.useState(
		currentUser.accounts.checking
	);
	const [balance, setBalance] = React.useState(
		currentUser.accounts.checking.balance + currentUser.accounts.savings.balance
	);

	// current balance printout
	let accountStatus = `${currentAccount.title} Account Balance: $${currentAccount.balance} `;

	let status = `Total Balance: $${
		currentUser.accounts.checking.balance + currentUser.accounts.savings.balance
	} `;

	// handles change within input
	const handleChange = (event) => {
		// changes deposit amount
		deposit = Number(event.target.value);
	};

	function clearDeposit() {
		document.getElementById("depositId").value = 0;
	}

	// handles submit button
	const handleSubmit = (event) => {
		event.preventDefault();

		let newTotal = balance + deposit;
		// change totalState to above newTotal
		setTotalState(newTotal);

		// create shallow state
		let tempState = [...user.users];

		let tempUser = tempState[currentUserIndex];

		// get date to push to object
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, "0");
		var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		var yyyy = today.getFullYear();
		today = mm + "/" + dd + "/" + yyyy;

		// create transaction
		let tempTransaction = {
			type: "deposit",
			date: today,
			amount: deposit,
			account: currentAccount,
			transactionId: Math.floor(Math.random() * 100000000),
		};

		// push transaction into users
		console.log(
			"trying to push into:",
			tempUser.accounts.checking.transactions
		);

		if (currentAccount.title === "checking") {
			tempUser.accounts.checking.transactions.push(tempTransaction);
			tempUser.accounts.checking.balance = newTotal;
		} else {
			tempUser.accounts.savings.transactions.push(tempTransaction);
			tempUser.accounts.savings.balance = newTotal;
		}

		// 	tempUser.accounts.checking.transactions.push(tempTransaction);
		// tempUser.accounts.checking.balance = newTotal;

		tempState[currentUserIndex] = tempUser;
		tempState = {
			users: tempState,
		};

		setUser(tempState);
		clearDeposit();
	};

	// html returned
	return loggedIn ? (
		<div className="full-page-container">
			<form className="container" onSubmit={handleSubmit}>
				<i className="bitcoin bi bi-currency-bitcoin"></i>
				<i className="lock bi bi-file-lock"></i>

				{/* welcome header */}
				<h1 className="welcome">Deposit</h1>
				<h1 className="current-account">
					Depositing Into: {currentAccount.title} Account
				</h1>
				{/* please select header */}
				<div className="deposit-select-account">
					<div
						id="checkingAccount"
						className="deposit-single-account"
						onClick={() => {
							setCurrentAccount(currentUser.accounts.checking);
						}}>
						<h4 className="deposit-single-account-title">Checking</h4>
					</div>
					<div
						id="savingsAccount"
						className="deposit-single-account"
						onClick={() => {
							setCurrentAccount(currentUser.accounts.savings);
						}}>
						<h4 className="deposit-single-account-title">Savings</h4>
					</div>
				</div>
				{/*  */}
				<ATMDeposit onChange={handleChange}></ATMDeposit>

				{/* current balace printout */}
				<div className="totals">
					<h2>{accountStatus}</h2>
					<h2 id="total">{status}</h2>
				</div>
			</form>
		</div>
	) : (
		<div className="page-container-center">
			<h1 className="please-login">Please Log In</h1>
		</div>
	);
}
