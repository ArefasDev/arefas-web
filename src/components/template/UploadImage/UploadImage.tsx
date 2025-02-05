import { message, Typography, Upload, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useState } from 'react'
import { FaImage } from 'react-icons/fa'
import { baseURL } from '../../../globals'

export default function UploadImage({
    onChange,
}: {
    onChange: (fileUrl: string | null) => void
}) {
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [messageApi, contextHolder] = message.useMessage()

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'done') {
            onChange(info.file.response?.url)
        } else if (info.file.status === 'error') {
            messageApi.open({
                type: 'error',
                content: 'Erro ao fazer upload da imagem!',
            })
        }
        setFileList(info.fileList)
    }

    return (
        <div className='d-flex flex-column align-items-center'>
            {contextHolder}
            <ImgCrop
                rotationSlider
                aspect={3 / 4}
            >
                <Upload
                    listType='picture-card'
                    fileList={fileList}
                    onChange={handleChange}
                    action={`${baseURL}/files`}
                    name='file'
                    data={{ destinationPath: 'members/avatar' }}
                    showUploadList={{ showRemoveIcon: true }}
                    maxCount={1}
                    accept='image/*'
                >
                    {fileList.length < 1 && (
                        <div className='d-flex flex-column align-items-center justify-content-center h-100'>
                            <FaImage size={24} />
                            <Typography.Text className='m-0 text-sm text-gray-500'>
                                Inserir
                            </Typography.Text>
                        </div>
                    )}
                </Upload>
            </ImgCrop>
        </div>
    )
}
