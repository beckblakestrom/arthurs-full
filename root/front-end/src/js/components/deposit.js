import { React, useContext, UserContext } from "../context";

// callback function, takes onclick functions
const ATMDeposit = ({ onChange, isDeposit }) => {
	// Choices for warning
	const { currentUserAccount } = useContext(UserContext);
	const choice = ["You are Depositing -", "You are Withdrawing -"];

	// html return
	return (
		<React.Fragment>
			<label className="input-container">
				{/* choice[0] for deposit or choice[1] for withdrawal */}

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
	const {
		user,
		setUser,
		loggedIn,
		setLoggedIn,
		currentUser,
		currentUserIndex,
		currentUserAccount,
		setCurrentUserAccount,
	} = useContext(UserContext);

	let selectedAccount = currentUserAccount.title;
let status = `Total Balance: $${currentUser.balance} `;
	let balance =
		currentUser.accounts.checking.balance +
		currentUser.accounts.savings.balance;

	let deposit = 0; // state of this transaction
	const [totalState, setTotalState] = React.useState(0);

	// deposit or withdrawal
	const [isDeposit, setIsDeposit] = React.useState(true);

	// current balance printout
	let accountStatus = `${currentUserAccount.title} Account Balance: $${balance} `;


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

		// creates new variables "newTotal". If isDeposit = true, add deposit. Else, subtract deposit.
		console.log(deposit);
		let newTotal = balance + deposit;
		// change totalState to above newTotal
		setTotalState(newTotal);

		// create shallow state
		let tempState = [...user.users];

		let tempUser = tempState[currentUserIndex];

		// create transaction
		// get date to push to object
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, "0");
		var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		var yyyy = today.getFullYear();
		today = mm + "/" + dd + "/" + yyyy;
		let tempTransaction = {
			type: "deposit",
			date: today,
			amount: deposit,
		};
		tempUser.transactions.push(tempTransaction);
		tempUser.balance = newTotal;

		tempState[currentUserIndex] = tempUser;
		tempState = {
			users: tempState,
		};

		setUser(tempState);
		clearDeposit();
		console.log(currentUserAccount);
	};

	// html returned
	return (
		<div className="full-page-container">
			<form className="container" onSubmit={handleSubmit}>
				<i className="bitcoin bi bi-currency-bitcoin"></i>
				<i className="lock bi bi-file-lock"></i>

				{/* welcome header */}
				<h1 className="welcome">Deposit</h1>
				<h1 className="current-account">
					Depositing Into: {currentUserAccount.title} Account
				</h1>
				{/* please select header */}
				<div className="deposit-select-account">
					<div
						id="checkingAccount"
						className="deposit-single-account"
						onClick={() => {
							setCurrentUserAccount(currentUser.accounts.checking);
						}}>
						<h4 className="deposit-single-account-title">Checking</h4>
					</div>
					<div
						id="savingsAccount"
						className="deposit-single-account"
						onClick={() => {
							setCurrentUserAccount(currentUser.accounts.savings);
						}}>
						<h4 className="deposit-single-account-title">Savings</h4>
					</div>
				</div>
				{/*  */}
				<ATMDeposit onChange={handleChange} isDeposit={isDeposit}></ATMDeposit>

				{/* current balace printout */}
				<div className="totals">
					<h2>{accountStatus}</h2>
					<h2 id="total">{status}</h2>
				</div>
			</form>
		</div>
	);
}
