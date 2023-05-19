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
				'@private': './src/private',
				'@Contracts': './src/Contracts',
				'@Controllers': './src/Controllers',
				'@Errors': './src/Errors',
				'@Functions': './src/Functions',
				'@Interfaces': './src/Interfaces',
				'@Mappings': './src/Mappings',
				'@Middlewares': './src/Middlewares',
				'@Resolvers': './src/Resolvers',
				'@Resources': './src/Resources',
				'@Router': './src/Router',
				'@Schemas': './src/Schemas',
				'@Services': './src/Services',
				'@Utils': './src/Utils',
			}
		}]
	],
	ignore: [
		'**/*.test.ts',
		'**/*.spec.ts'
	]
};