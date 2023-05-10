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
				'@Middlewares': './src/Middlewares',
				'@Router': './src/Router',
			}
		}]
	],
	ignore: [
		'**/*.test.ts',
		'**/*.spec.ts'
	]
};