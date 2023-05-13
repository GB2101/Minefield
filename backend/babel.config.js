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
				'@Interfaces': './src/Interfaces',
				'@Functions': './src/Functions',
				'@Middlewares': './src/Middlewares',
				'@Resources': './src/Resources',
				'@Router': './src/Router',
				'@Utils': './src/Utils',
			}
		}]
	],
	ignore: [
		'**/*.test.ts',
		'**/*.spec.ts'
	]
};