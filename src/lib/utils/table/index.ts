export const generatePageSizes = (values: number[]) => {
	let sizes = [];

	for (let value of values) {
		sizes.push({
			value,
			label: `${value} per page`
		});
	}

	return sizes;
};
