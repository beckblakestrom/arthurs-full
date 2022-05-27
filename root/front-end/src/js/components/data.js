import React from "react";
import { useContext } from "react";
import { UserContext } from "../context";

function UserData({ data }) {
	let balance =
		data.accounts.checking.balance +
		data.accounts.savings.balance +
		data.accounts.credit.balance +
		data.accounts.trading.balance;
	return (
		<div className="user-data-entry">
			<h4 className="user-data-item data-first-name">
				First Name: <span className="user-data-span">{data.firstName}</span>
			</h4>
			<h4 className="user-data-item data-last-name">
				Last Name: <span className="user-data-span">{data.lastName}</span>
			</h4>
			<h4 className="user-data-item data-email">
				Email: <span className="user-data-span">{data.email}</span>
			</h4>
			<h4 className="user-data-item data-password">
				Password: <span className="user-data-span">{data.password}</span>
			</h4>
			<h4 className="user-data-item data-balance">
				Balance: <span className="user-data-span">${balance}</span>
			</h4>
		</div>
	);
}

export default function DataDisplay() {
	const { user } = useContext(UserContext);

	return (
		<div className="user-data-container">
			<h1 className="data-header">Accounts</h1>
			{user.users.map((user, i) => {
				return <UserData data={user} key={i}></UserData>;
			})}
			<i
				className="bi bi-x-circle x"
				onClick={() => {
					document.getElementById("user-data").classList.toggle("data-show");
					document
						.getElementById("data-float")
						.classList.toggle("data-float-hide");
				}}></i>
		</div>
	);

	// for (let i = 0; i < user.users.length; i++) {
	// 	let thisUser = user.users[i];
	// 	console.log(thisUser);
	// 	return <h1>{thisUser.lastName}</h1>;
	// }
}
