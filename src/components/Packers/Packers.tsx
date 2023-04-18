import React, { useState } from 'react'
import { Card, Row, Col, Button, Popconfirm, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useLoaderData } from 'react-router-dom'
import { type Packer } from './Packers.types'
import { CreatePacker } from './CreatePacker'
import api from '../../api/packers.resource'

export const Packers: React.FC = () => {
  const packersData: unknown = useLoaderData()
  const [packers, setPackers] = useState(packersData as Packer[])
  const [packerDetails, setPackerDetails] = useState<Packer>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = (packer: Packer | undefined): void => {
    setIsModalOpen(true)
    setPackerDetails(packer)
  }
  const confirm = (packerID: string): void => {
    // message.info('Clicked on Yes.');
    api
      .deletePacker(packerID)
      .then((res) => {
        console.log('deleted :>> ', res)
        setPackers(packers.filter((p) => p.id !== packerID))
      })
      .catch((res) => {
        console.log('deleted  :>> ', res)
        setPackers(packers.filter((p) => p.id !== packerID))
      })
  }

  const handleCancel = (): void => {
    setIsModalOpen(false)
  }
  const onFinish = (packer: Packer): void => {
    if (packerDetails?.id != null) {
      api
        .editPacker({ ...packer, id: packerDetails.id })
        .then((res) => {
          console.log('updated :>> ', res)
          const updatedPackers = packers.map((p) => {
            if (p.id === packerDetails.id) {
              return { ...packer }
            }
            return { ...p }
          })
          setPackers([...updatedPackers])
        })
        .catch((res) => {
          console.log('update failed :>> ', res)
        })
    } else {
      api
        .createPacker(packer)
        .then((res) => {
          console.log('created :>> ', res)
          setPackers([...packers, { ...res }])
        })
        .catch((res) => {
          console.log('create failed :>> ', res)
        })
    }
    setIsModalOpen(false)
  }

  const onFinishFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo)
  }
  console.log('packers :>> ', packers)
  return (
    <>
      <Button
        type='primary'
        onClick={() => {
          showModal(undefined)
        }}
      >
        Create Packer
      </Button>
      <CreatePacker
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        packer={packerDetails}
      />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {packers.map((packer: Packer) => (
          <Col key={packer.id} className='gutter-row py-3' span={6}>
            <Card
              title={packer.name}
              bordered={false}
              actions={[
                <EditOutlined
                  key='edit'
                  onClick={() => {
                    showModal(packer)
                  }}
                />,
                <Popconfirm
                  placement='rightBottom'
                  title={'Are you sure to delete this packer?'}
                  description={'description'}
                  onConfirm={() => {
                    confirm(packer.id)
                  }}
                  okText='Delete'
                  cancelText='No'
                  key={'delete'}
                >
                  <DeleteOutlined />
                </Popconfirm>,
              ]}
            >
              <p>{packer.city}</p>
              {packer.phoneNo}
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}
