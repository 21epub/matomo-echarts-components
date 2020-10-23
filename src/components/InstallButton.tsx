import React, { useState } from 'react'
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

interface Props {
  downloadUrl: string
}

function InstallButton({ downloadUrl }: Props) {
  const [buttonState, setButtonState] = useState(false)

  const downloadFile = () => {
    console.log(downloadUrl)
    setButtonState(true)
    fetch(downloadUrl, {
      method: 'get'
    })
      .then((response) => {
        response.blob().then((blob) => {
          setButtonState(false)
          const blobUrl = window.URL.createObjectURL(blob)
          const filename = 'collection-data.csv'
          const aElement = document.createElement('a')
          // document.body.appendChild(aElement);
          aElement.style.display = 'none'
          aElement.href = blobUrl
          aElement.download = filename
          aElement.click()
          // document.body.removeChild(aElement);
        })
      })
      .catch((error) => {
        setButtonState(false)
        console.log('下载失败', error)
      })
  }

  return (
    <Button
      icon={<DownloadOutlined />}
      onClick={downloadFile}
      loading={buttonState}
    >
      下载数据
    </Button>
  )
}

export default InstallButton
