module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current'
				}
			},
		],
		'@babel/preset-typescript'
	],
	plugins: [
		['module-resolver', {
			alias: {
				'@Controllers': './src/Controllers',
				'@Router': './src/Router',
			}
		}]
	],
	ignore: [
		'**/*.test.ts',
		'**/*.spec.ts'
	]
};