const groups = [
	[
		[{
				name: 'Meter',
				isRoot: true
			},
			{
				name: 'DeciMeter',
				multiply: 10
			},
			{
				name: 'CentiMeter',
				multiply: 100
			},
			{
				name: 'MilliMeter',
				multiply: 1000
			}
		],
		[{
				name: 'FooT',
				multiply: 3.2808399
			},
			{
				name: 'INch',
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
		if (!unit.unit)
			unit.unit = unit.name.replace(/[^A-Z]/g, '').toLowerCase();
		unit.name = unit.name.toLowerCase();
		unit.isRoot = !!unit.isRoot;
	}
}

export default groups;