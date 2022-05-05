require('dotenv').config();

const reuter = require("express").Router()
const aws = require('aws-sdk');
const multer = require("multer")
const multerS3 = require('multer-s3');

const spacesEndpoint = new aws.Endpoint('signedurls.ap-south-1.linodeobjects.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.LINODE_ACCESS_TOKEN,
  secretAccessKey: process.env.SECRET_KEY,
  sslEnabled: true,
  // region: AWS_REGION,
  signatureVersion: 'v4',
  s3DisableBodySigning: true,
  s3ForcePathStyle: true,
  signatureCache: false,
//   params: {
//     Headers: {
//       Authorization: `Bearer ${process.env.SECRET_KEY}`
//     }
//   }

});

const filename="322-CC4.pdf";
const contentType=filename.contentType

reuter.get("/upload",async (req,res)=>{

    const presignedUrl = await s3.getSignedUrlPromise('putObject', {
        Bucket: 'signedurls',
        Key: filename,
        Expires: 180,
        ACL: 'public-read',
        ContentType: 'application/pdf',
      })

    res.json({
        presignedUrl,
        filename
    })
});

reuter.get("/view",async (req,res)=>{

    const presignedUrl = await s3.getSignedUrlPromise('getObject', {
        Bucket: 'signedurls',
        Key: filename,
        Expires: 180
        // ACL: 'public-read',
        // ContentType: 'application/pdf',
      })

    res.json({
        presignedUrl,
        filename
    })
});

reuter.get("/delete",async (req,res)=>{

    const presignedUrl = await s3.getSignedUrlPromise('deleteObject', {
        Bucket: 'signedurls',
        Key: filename,
        Expires: 180
        // ACL: 'public-read',
        // ContentType: 'application/pdf',
      })

    res.json({
        presignedUrl,
        filename
    })
});


module.exports = reuter;