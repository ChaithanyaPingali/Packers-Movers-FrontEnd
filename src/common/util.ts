import api from '../api/packers.resource'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getAllPackers = async () => {
  const packers = await api.getAllPackers()
  return packers
}
