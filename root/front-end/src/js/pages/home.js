import { React, useContext, UserContext } from "../context";

function Banner(props) {
	return (
		<React.Fragment>
			<div className="banner">
				<img className="banner-image" src={props.image} alt="React Home" />
				<h1 className="banner-text">{props.text}</h1>
			</div>
			<div className="products-container">
				<h1 className="products-header">Products & Services</h1>
				<div className="products">
					<div className="product-item">
						<h6>Credit Cards</h6>
						<i className="bi bi-credit-card-2-front"></i>
					</div>
					<div className="product-item">
						<h6>Checking Accounts</h6>
						<i className="bi bi-wallet2"></i>
					</div>
					<div className="product-item">
						<h6>Savings Accounts</h6>
						<i className="bi bi-piggy-bank"></i>
					</div>
					<div className="product-item">
						<h6>Investment Portfolios</h6>
						<i className="bi bi-graph-up-arrow"></i>
					</div>
					<div className="product-item">
						<h6>Lending</h6>
						<i className="bi bi-house"></i>
					</div>
					<div className="product-item">
						<h6>Currency Exchange</h6>
						<i className="bi bi-currency-exchange"></i>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default function Home() {
	const { currentUser, loggedIn } = useContext(UserContext);

	let welcome = `Welcome Back, ${currentUser.firstName}.`;

	return !loggedIn ? (
		<React.Fragment>
			<Banner image="/images/banner.jpg" text="Banking Redefined" />
		</React.Fragment>
	) : (
		<React.Fragment>
			<Banner image="/images/banner2.jpg" text={welcome} />
		</React.Fragment>
	);
}
