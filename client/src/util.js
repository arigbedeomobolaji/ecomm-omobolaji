export const updateData = (original, comparator) => {
	const update = {};
	for (let key in original) {
		if (original[key] !== comparator[key]) {
			update[key] = comparator[key];
		}
	}

	return update;
};
