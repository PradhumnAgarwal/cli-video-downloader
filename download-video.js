const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');
const loader = require('cli-loader')();

async function downloadVideo(videoURL, folderName, fileName){
    const outputPath = path.join(folderName, `${fileName}.mp4`);
    if(fs.existsSync(outputPath)){
        console.log(`${fileName} already exist!`)
        return outputPath;
    }
    if(!fs.existsSync(folderName)){
        fs.mkdirSync(folderName);
    }


    const videoStream = ytdl(videoURL, {quality: 'highest'});
    const writeStream = fs.createWriteStream(outputPath);
    console.log("Video started downloading...")
    loader.start();

    return new Promise((resolve, reject)=>{
        videoStream.pipe(writeStream);
        writeStream.on('finish',  ()=>{
            loader.stop();
            console.log('Video downloaded successfully!')
            resolve(outputPath);
        })
        writeStream.on('error', ()=>{
            loader.stop();
            console.log("Error in writing the video.")
            reject();
        });
    })
}


module.exports = {downloadVideo};