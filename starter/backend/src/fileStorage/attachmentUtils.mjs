import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import AWSXRay from 'aws-xray-sdk-core'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const bucketName = process.env.ATTACHMENT_S3_BUCKET

const s3Client = new S3Client({})
const urlExpiration = 300

export async function getUploadUrl(todoId) {
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: todoId
    })

    const uploadUrl = await getSignedUrl(
        s3Client,
        command,
        {
            expiresIn: urlExpiration
        }
    )

    return uploadUrl
}