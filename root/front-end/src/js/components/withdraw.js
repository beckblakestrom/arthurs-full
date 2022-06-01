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

export default function Withdraw() {
	const { user, setUser, loggedIn, currentUser, currentUserIndex } =
		useContext(UserContext);

	let withdraw = 0; // state of this transaction
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
		withdraw = Number(event.target.value);
	};

	function clearDeposit() {
		document.getElementById("depositId").value = 0;
	}

	// handles submit button
	const handleSubmit = (event) => {
		event.preventDefault();

		if (withdraw > currentAccount.balance) {
			alert("Insufficient Funds");
		} else {
			let newTotal = currentAccount.balance - withdraw;
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
				type: "withdraw",
				date: today,
				amount: -withdraw,
				account: currentAccount.title,
				transactionId: Math.floor(Math.random() * 1000000),
				timestamp: +new Date(),
			};

			// push transaction into users
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
		}
	};

	// html returned
	return loggedIn ? (
		<div className="full-page-container">
			<form className="container" onSubmit={handleSubmit}>
				<i className="bitcoin bi bi-currency-bitcoin"></i>
				<i className="lock bi bi-file-lock"></i>

				{/* welcome header */}
				<h1 className="welcome">Withdraw</h1>
				<h1 className="current-account">
					Withdrawing From: {currentAccount.title} Account
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
