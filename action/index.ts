import * as core from '@actions/core';
import fetch from 'node-fetch';

// 0-100 >100 mean Infinity
const memUsedBound = parseInt(core.getInput('mem_used_bound', {required: true}))
const cpuUsedBound = parseInt(core.getInput('cpu_used_bound', {required: true}))
const avgCpuUsedBound = parseInt(core.getInput('avg_cpu_used_bound', {required: true}))
const diskUsedBound = parseInt(core.getInput('disk_used_bound', {required: true}))

const TELEGRAM_BOT_TOKEN = core.getInput('telegram_bot_token')
const API_URL = core.getInput('stat_api')
const NAME = core.getInput('disply_name')
const SEND_TO = core.getInput('send_to')

const GB = 1024 * 1024 * 1024

async function run() {
    let message: string = null
    let data = undefined;
    try {

        const resp = await fetch(API_URL)
        data = await resp.json()
    } catch (e) {
        core.setFailed('Failed to request API')
    }
    const memUsedPrecent = (data.mem.used / data.mem.total) / 100
    if(memUsedPrecent >= memUsedBound) {
        message = `**ALERT**: ${NAME} Memory used ${data.mem.used / GB }GB, ${Math.floor(memUsedPrecent * 10000) / 100}%`
    }
    const diskUsedPrecent = data.fsSize.use
    if(diskUsedPrecent > diskUsedBound) {
        message = `**ALERT**: ${NAME} Disk used ${data.fsSize.used / GB}GB, ${diskUsedPrecent}%`
    }
    const {currentload, avgload} = data.currentLoad
    if(currentload > cpuUsedBound) {
        message = `**ALERT**: ${NAME} CPU load ${diskUsedPrecent}%`
    }
    if(avgload > avgCpuUsedBound) {
        message = `**ALERT**: ${NAME} CPU average load ${diskUsedPrecent}%`
    }

    core.setOutput('telegram_message', message)
    if(message) {
        fetch(`https://api.telegram.org/${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            body: JSON.stringify({
                chat_id: SEND_TO,
                text: message,
                parse_mode: 'MarkdownV2'
            })
        }).catch(err => {
            core.setFailed('Failed to send message')
        })
    }
}

run()
