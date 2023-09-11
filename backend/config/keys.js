import prod from "./prod.js";

let keys;

if (process.env.NODE_ENV !== "production") {
	const dev = require("./dev.js");
	keys = dev;
}

if (process.env.NODE_ENV === "production") {
	keys = prod;
}

export default keys;

// MY skype id: live:.cid.bd63ed933000e56f
