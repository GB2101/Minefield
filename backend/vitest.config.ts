import {defineConfig} from 'vitest/config'
import tsconfig from 'vitest-tsconfig-paths'

export default defineConfig({
	test: {
		globals: true,
		coverage: {
			provider: 'c8',
			include: [ "src/**" ],
			all: true,
			reporter: 'html'
		}
	},
	plugins: [ tsconfig() ]
})