const groups = [
	[
		[{
				name: 'meter',
				unit: 'm',
				isRoot: true
			},
			{
				name: 'decimeter',
				unit: 'dm',
				multiply: 10
			},
			{
				name: 'centimeter',
				unit: 'cm',
				multiply: 100
			},
			{
				name: 'millimeter',
				unit: 'mm',
				multiply: 1000
			}
		],
		[{
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
	]
];

for (let group of groups) {
	group = group.flat();
	for (const unit of group) {
		if (unit.multiply) {
			unit.fromRoot = x => x * unit.multiply;
			unit.toRoot = x => x / unit.multiply;
		}
		unit.isRoot = !!unit.isRoot;
	}
}

export default groups;