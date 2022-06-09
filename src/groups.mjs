const groups = [
	[{
			name: 'meter',
			unit: 'm'
		},
		{
			name: 'foot',
			unit: 'ft',
			fromRoot: i => i * 3.2808399,
			toRoot: i => i / 3.2808399
		},
		{
			name: 'inch',
			unit: 'in',
			fromRoot: i => i * 39.3700788,
			toRoot: i => i / 39.3700788
		}
	]
];

export default groups;