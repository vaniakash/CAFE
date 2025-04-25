import { build } from 'vite'

async function buildApp() {
  try {
    await build({
      root: process.cwd(),
      build: {
        outDir: 'dist',
        sourcemap: true,
        assetsDir: 'assets',
      },
    })
    console.log('Build completed successfully')
  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}

buildApp() 