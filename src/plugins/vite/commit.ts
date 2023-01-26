import { execSync } from 'node:child_process'

export default () => {
  const data = execSync('git rev-parse --short HEAD')
  return data.toString().trim()
}
