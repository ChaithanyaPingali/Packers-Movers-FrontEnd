export interface Packer {
  id: string
  name: string
  email: string
  phoneNo: number
  city: string
  state: string
}

export interface CreateParkerProps {
  isModalOpen: boolean
  packer?: Packer 
  onFinish: (p: Packer) => void
  onFinishFailed: (e: any) => void
  handleCancel: () => void
}
