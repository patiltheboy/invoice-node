const express = require("express");
const router = express.Router();
const pdf = require('html-pdf');
const path = require('path');
const AWS = require('aws-sdk');
const fs = require('fs');
const { saleInovoice } = require("../controllers/saleinvoice");

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION
})

// --------------------------Sale Pdf--------------------------------------
router.post('/createsaleorder', (req, res) => {
    try {
        var config = { format: 'A5' };
        // pdf.create(saleInovoice(req.body), config).toFile('./public/saleinvoice.pdf', (err) => {
        //     if (err) {
        //         res.send(Promise.reject());
        //     }

        //     if (Promise.resolve()) {
        //          res.json({ status: "success" })
        //     }
        // });

        pdf.create(saleInovoice(req.body), config).toStream(async function (err, stream,) {
            stream.pipe(fs.createWriteStream('saleinvoice.pdf'));
            const params = {
                Key: 'saleinvoice.pdf',
                Body: stream,
                Bucket: process.env.AWS_BUCKET_NAME + "/invoice",
                ContentType: 'application/pdf',
            };


            s3.upload(params, (err, result) => {
                if (err) {
                    console.log(err, 'err');
                }
            });
            var options = {
                Bucket: process.env.AWS_BUCKET_NAME + "/invoice",
                Key: 'saleinvoice.pdf',
            };

            res.attachment('saleinvoice.pdf');
            var fileStream = s3.getObject(options).createReadStream();
            fileStream.pipe(res);

        });
    } catch (error) {
        return res.json({ status: 'failed', msg: error.message })
    }
});

router.get('/hello', (req, res) => {
    try {
        return res.json({ status: "success", msg: "Welcome to Goa!",
    data: {
        region: process.env.AWS_BUCKET_REGION
    }
    })
    } catch (error) {
        return res.json({ status: 'failed', msg: error.message })
    }
})

module.exports = router