import { ApiHandler as makeReq } from './ApiHandler'
const BASE_URL = 'packer'
export default {
  getAllPackers: () => {
    return makeReq({
      url: `${BASE_URL}/getAllPackers`,
      method: 'GET',
    })
  },
  createPacker: (packer) => {
    return makeReq({
      url: `${BASE_URL}`,
      method: 'POST',
      data: packer,
    })
  },
  editPacker: (packer) => {
    return makeReq({
      url: `${BASE_URL}/${packer.id}`,
      method: 'PUT',
      data: packer,
    })
  },
  deletePacker: (packerID) => {
    return makeReq({
      url: `${BASE_URL}/${packerID}`,
      method: 'DELETE',
    })
  },
}
