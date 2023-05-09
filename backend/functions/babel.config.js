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
				'@pages': './src/pages'
			}
		}]
	],
	ignore: [
		'**/*.test.ts',
		'**/*.spec.ts'
	]
};