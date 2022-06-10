const groups = [
	[
		[{
				name: 'KiloMeter',
				multiply: 1e-3
			},
			{
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
				name: 'MIle',
				multiply: 6.21371192e-4
			},
			{
				name: 'YarD',
				multiply: 1.0936133
			},
			{
				name: 'FooT',
				multiply: 3.2808399
			},
			{
				name: 'INch',
				multiply: 39.3700788,
			}
		],
		[{
				name: 'Light-Year',
				multiply: 1.05702341e-16
			},
			{
				name: 'astronomical unit',
				multiply: 6.68458712e-12,
				unit: 'AU'
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