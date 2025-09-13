const { where } = require('sequelize')
const {datawebsite, galleries} = require('../Model/datawebsite.model.js')
const AWS = require('aws-sdk')

module.exports = class datawebsiteService{
    find = async (req) => {
        let response = await datawebsite.findAll({
            where:{
                status: 1
            },
            include: [galleries],
            order: [
                ['created_at', 'DESC']
            ]
        })

        response = await Promise.all(
            response.map(async (item) => {
                const plain = item.get({ plain: true });
                const signedUrl = await this.findImageS3(plain.gambar);
                return {
                    // ...plain,
                    num_: plain.id,
                    app: plain.app,
                    tools: plain.tools,
                    author: plain.author,
                    github_url: plain.github_url,

                    gambar_name: plain.gambar,
                    gambar: signedUrl,
                };
            })
        );
        return response
    }
    findOne = async (id) => {
        const response = await datawebsite.findAll({
            include: [galleries],
            where: {
                id : id
            }
        })
        return response
    }

    findTags = async (req) => {
        let data = await this.find()

        let allTags = data.map((item) => item.tools)
        let splitTags = allTags.map(tag => tag.split(',').map(t => t.trim())).flat()

        let count = {}
        splitTags.forEach(tag => {
            count[tag] = (count[tag] || 0) + 1
        });

        let response = Object.entries(count).map(([tag, total]) => ({
            "Tag": tag, 
            "Total":total
        }))

        response.sort((a, b) => b.Total - a.Total)
        
        return response
    }

    findImageS3 = async (img_url) => {
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_DEFAULT_REGION,
            endpoint: process.env.AWS_ENDPOINT,
            // signatureVersion: "v4"
        });

        const params = {
            Bucket: "ideghonam",
            Key: "projects/" + img_url,
            Expires: 10
        };

        const url = await s3.getSignedUrlPromise("getObject", params);

        return url
    }
}