import prod from "./prod.js";
import dev from "./dev.js";

let keys;

if (process.env.NODE_ENV !== "production") {
	keys = dev;
}

if (process.env.NODE_ENV === "production") {
	keys = prod;
}

export default keys;

// MY skype id: live:.cid.bd63ed933000e56f
