import { spawn } from 'child_process'

export type SupersimParameters = {
  l1Port?: number
  l2StartingPort?: number
}

export type SupersimReturnArg = Promise<() => void>

export async function startSupersim(
  params?: SupersimParameters,
): SupersimReturnArg {
  const args = [] as string[]

  if (params?.l1Port) {
    args.push(`--l1.port ${params.l1Port}`)
  }

  if (params?.l2StartingPort) {
    args.push(` --l2.starting.port ${params.l2StartingPort}`)
  }

  const supersimProcess = spawn('supersim', args, { shell: true })

  return () => {
    if (!supersimProcess.killed) {
      supersimProcess.kill()
    }
  }
}
