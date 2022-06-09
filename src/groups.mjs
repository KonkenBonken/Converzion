const groups = [
	[{
			name: 'meter',
			unit: 'm'
		},
		{
			name: 'foot',
			unit: 'ft',
			multiply: 3.2808399
		},
		{
			name: 'inch',
			unit: 'in',
			multiply: 39.3700788,
		}
	]
];

for (const group of groups)
	for (const unit of group)
		if (unit.multiply) {
			unit.fromRoot = x => x * unit.multiply;
			unit.toRoot = x => x / unit.multiply;
		}

export default groups;