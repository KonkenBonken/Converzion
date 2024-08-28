		,
['mass',
	'metric',
	{
		name: 'GigaTonne',
		multiply: 1e15,
		unit: 'Gt'
	}, {
		name: 'MegaTonne',
		multiply: 1e12,
		unit: 'Mt'
	}, {
		name: 'Tonne',
		multiply: 1e6,
		unit: 'metric tonne'
	}, {
		name: 'KiloGram',
		multiply: 1e3
	}, {
		name: 'Gram',
		isRoot: true
	}, {
		name: 'MilliGram',
		multiply: 1e-3
	}, {
		name: 'MicroGram',
		multiply: 1e-6,
		unit: 'µg'
	}, {
		name: 'NanogGram',
		multiply: 1e-9
	}, {
		name: 'PicoGram',
		multiply: 1e-12
	},

	'imperial',
	{
		name: 'us ton',
		multiply: 907e3,
		unit: 'US ton'
	}, {
		name: 'uk ton',
		multiply: 1.016e6,
		unit: 'UK ton'
	}, {
		name: 'pound',
		multiply: 453.59 ** -1,
		unit: 'lb'
	}, {
		name: 'ounce',
		multiply: 28.35 ** -1,
		unit: 'oz'
	}
],
	['temperature',
		{
			name: 'celsius',
			isRoot: true,
			unit: '°C'
		}, {
			name: 'fahrenheit',
			fromRoot: c => c * 1.8 + 32,
			toRoot: f => (f - 32) / 1.8,
			unit: '°F'
		}, {
			name: 'Kelvin',
			fromRoot: c => c + 273.15,
			toRoot: k => k - 273.15
		}, {
			name: 'newton',
			multiply: .33 ** -1,
			unit: '°N'
		}, {
			name: 'rankine',
			fromRoot: c => (c + 273.15) / 1.8,
			toRoot: r => r * 1.8 - 273.15,
			unit: '°R'
		}
	]
	];

for (let group of groups) {
	for (const unit of group) {
		if (typeof unit === 'string') continue;
		const { multiply } = unit;
		if (multiply) {
			unit.fromRoot = n => n * multiply;
			unit.toRoot = n => n / multiply;
		}
		if (!unit.unit)
			unit.unit = unit.name.replace(/[^A-Z]/g, '').toLowerCase();
		unit.name = unit.name.toLowerCase();
		unit.isRoot = !!unit.isRoot;
		if (unit.isRoot)
			unit.fromRoot = unit.toRoot = x => x;
	}
}

export default groups;