export const updateData = (original, comparator) => {
	const update = {};
	for (let key in original) {
		if (original[key] !== comparator[key]) {
			update[key] = comparator[key];
		}
	}

	return update;
};
let apiBaseUrl;

if (process.env.NODE_ENV === "production") {
	apiBaseUrl = `https://ecomm-omobolaji-backend.vercel.app`;
} else {
	apiBaseUrl = "";
}

export default apiBaseUrl;
