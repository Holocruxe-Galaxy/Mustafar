import { useRef, useEffect } from 'react'

/* Material UI */
import { IconButton } from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile'

export const Cloudinary = ({ setValues, values }: any) => {
  const cloudinaryRef = useRef<any>(null)
  const buttonRef = useRef<any>(null)
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    buttonRef.current = cloudinaryRef?.current?.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_UPLOAD_PRESET
      },
      function (error: any, result: any) {
        const photoRoute = result.info.secure_url
        if (photoRoute !== undefined) {
          const photo = [result.info.secure_url]
          setValues({ ...values, photo })
        }
      }
    )
    // eslint-disable-next-line
  }, [])

  return (
    <IconButton sx={{ marginRight: 4 }} onClick={() => buttonRef?.current?.open()}>
      <AttachFileIcon />
    </IconButton>
  )
}
