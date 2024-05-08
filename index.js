#!/usr/bin/env YTDL_NO_UPDATE node

const { Command } = require('commander');
const { downloadVideo } = require('./download-video');
const program = new Command();


program
    .name('string-util')
    .description('CLI to some JavaScript string utilities')
    .version('0.8.0');


program.command('video <url>')
    .description('Download the video from youtube link')
    .option('-f, --folderName <folderName>', 'Folder name to save the file.')
    .option('-n, --fileName <fileName>', 'File name of the video.')
    .action(async (url, options) => {
        try {
            await downloadVideo(url, options.folderName, options.fileName);
        } catch (error) {
            
        }
    });



program.parse(process.argv);
