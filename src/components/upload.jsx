import React from 'react';
import axios from "axios";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const Preview = ({ meta }) => {
    const { name, percent, status } = meta
    return (
        <span style={{ alignSelf: 'flex-start', margin: '10px 3%', fontFamily: 'Helvetica' }}>
      {name}, {Math.round(percent)}%, {status}
    </span>
    )
}

const CustomPreview = () => {
    const getUploadParams = () => ({ url: 'https://httpbin.org/post' })

    const API_ENDPOINT = "https://cls60m89s4.execute-api.ap-northeast-1.amazonaws.com/default/UploadTestMeiPOC"

    const handleSubmit = async (files, allFiles) => {
        const uploadFiles = await allFiles;

         for (const f of uploadFiles ){
            // get request for s3 presigned url  through aws-api-gateway and lambda
            const presigned_url = await axios({
                method: 'GET',
                url: API_ENDPOINT
            })
            console.log('presigned_url', presigned_url)

            // put request to upload files to s3
            const result = await fetch(presigned_url.data.uploadURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "image/jpeg"
                },
                body: f
            })
        }

        // console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onSubmit={handleSubmit}
            PreviewComponent={Preview}
            inputContent="Drop Files (Custom Preview)"
            disabled={files => files.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status))}
        />
    )
}

<CustomPreview/>

export default CustomPreview;