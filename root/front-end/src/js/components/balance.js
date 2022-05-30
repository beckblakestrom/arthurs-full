import { React, useContext, Link, UserContext } from "../context";

export default function Balance() {
	const { currentUser, loggedIn } = useContext(UserContext);

	let balance =
		currentUser.accounts.checking.balance +
		currentUser.accounts.savings.balance;

	let checkingTransactions = currentUser.accounts.checking.transactions;
	let savingsTransactions = currentUser.accounts.savings.transactions;
	let transactions = checkingTransactions.concat(savingsTransactions);

	function dynamicSort(property) {
		var sortOrder = 1;
		if (property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a, b) {
			/* next line works with strings and numbers,
			 * and you may want to customize it to your needs
			 */
			var result =
				a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
			return result * sortOrder;
		};
	}

	let sortedTransactions = transactions.sort(dynamicSort("-timestamp"));
	console.log(sortedTransactions);

	function Transactions({ data }) {
		return (
			<div className="account-transaction">
				<h4 className="user-data-item data-first-name">
					Type: <span className="user-data-span">{data.type}</span>
				</h4>

				<h4 className="user-data-item data-last-name">
					Amount:<span className="user-data-span">${data.amount}</span>
				</h4>
				<h4 className="user-data-item data-last-name">
					Account:<span className="user-data-span">{data.account}</span>
				</h4>
				<h4 className="user-data-item data-first-name">
					Date: <span className="user-data-span">{data.date}</span>
				</h4>
				<h4 className="user-data-item data-first-name">
					Transaction ID:{" "}
					<span className="user-data-span">{data.transactionId}</span>
				</h4>
			</div>
		);
	}

	return loggedIn ? (
		<div>
			<div className="page-container">
				<div className="account-container">
					<h1 className="account-welcome">
						Hi, {currentUser.firstName}. Here are your account details.
					</h1>
					<div className="account-accounts">
						<div className="single-account">
							<h4 className="single-account-title">Checking Account</h4>
							<h4 className="single-account-balance">
								${currentUser.accounts.checking.balance}
							</h4>
						</div>
						<div className="single-account">
							<h4 className="single-account-title">Savings Account</h4>
							<h4 className="single-account-balance">
								${currentUser.accounts.savings.balance}
							</h4>
						</div>
					</div>
					<h1 className="account-balance">Current Balance:
						<div>${balance}</div></h1>
					<div className="account-transaction-container">
						<h1 className="account-transaction-header">Latest Transactions</h1>
						{sortedTransactions.map((transaction, i) => {
							return <Transactions data={transaction} key={i}></Transactions>;
						})}
					</div>
					<div className="account-nav">
						<Link className="account-deposit grid-button" to="/deposit/">
							Deposit <i className="bi bi-piggy-bank"></i>
						</Link>
						<Link className="account-withdraw grid-button" to="/withdraw/">
							Withdrawal <i className="icon icon-2 bi bi-cash-stack"></i>
						</Link>
						<Link className="account-deposit grid-button" to="/deposit/">
							Transfer <i className="bi bi-arrow-left-right"></i>
						</Link>
						<Link className="account-deposit grid-button" to="/deposit/">
							Exchange <i className="bi bi-currency-exchange"></i>
						</Link>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className="page-container-center">
			<h1 className="please-login">Please Log In</h1>
		</div>
	);
}
