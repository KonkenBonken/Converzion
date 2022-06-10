const groups = [
	[
		[{
			name: 'KiloMeter',
			multiply: 1e-3
		}, {
			name: 'Meter',
			isRoot: true
		}, {
			name: 'DeciMeter',
			multiply: 10
		}, {
			name: 'CentiMeter',
			multiply: 1e2
		}, {
			name: 'MilliMeter',
			multiply: 1e3
		}],
		[{
			name: 'MIle',
			multiply: 6.21371192e-4
		}, {
			name: 'YarD',
			multiply: 1.0936133
		}, {
			name: 'FooT',
			multiply: 3.2808399
		}, {
			name: 'INch',
			multiply: 39.3700788,
		}],
		[{
			name: 'Light-Year',
			multiply: 1.05702341e-16
		}, {
			name: 'astronomical unit',
			multiply: 6.68458712e-12,
			unit: 'AU'
		}]
	],
	[
		[{
			name: 'GigaTonne',
			multiply: 1e15,
			unit: 'Gt'
		}, {
			name: 'MegaTonne',
			multiply: 1e12,
			unit: 'Mt'
		}, {
			name: 'Tonne',
			multiply: 1e6
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
		}],
		[{
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
		}]
	],
	[{
		name: 'celsius',
		isRoot: true,
		unit: '°C'
	}, {
		name: 'fahrenheit',
		fromRoot: c => c * 1.8 + 32,
		toRoot: f => (f - 32) / 1.8,
		unit: '°F'
	}, {
		name: 'kelvin',
		fromRoot: c => c + 273.15,
		toRoot: k => k - 273.15,
		unit: 'K'
	}, {
		name: 'newton',
		multiply: .33 ** -1,
		unit: '°N'
	}, {
		name: 'rankine',
		fromRoot: c => (c + 273.15) / 1.8,
		toRoot: r => r * 1.8 - 273.15,
		unit: '°R'
	}]
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