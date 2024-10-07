export const SimulateWork = (ms: number) => {
    return new Promise((r) => setTimeout(r, ms))
}