const ytdl = require('ytdl-core')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')

ffmpeg.setFfmpegPath(ffmpegPath)

const urlYT = 'https://www.youtube.com/watch?v=vdB-8eLEW8g'

const  FileName = 'output.mp3'


async function fetchVideo(url,fileName){
    return new Promise((res,rej)=>{
        const vidSream = ytdl(url,{quality:'highestaudio'})

        const ffmpegCommand = ffmpeg(vidSream)
        .audioBitrate(128)
        .toFormat('mp3')
        .save(fileName)
        .on('end',()=>{
            res()
        })
        .on('error',(e)=>{
            rej(e)
        })

        ffmpegCommand.run()
    })
}

console.info('loading...');
fetchVideo(urlYT,FileName).then(()=>console.info(
    'Done!'
)).catch((e)=>console.info(e))