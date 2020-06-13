import * as si from 'systeminformation'
import {IncomingMessage, ServerResponse, Server} from 'http'
import {send} from 'micro'

const s = async (req: IncomingMessage, res: ServerResponse) => {
    const data = await si.get({
        cpu: '*',
        fsSize: '*',
        disksIO: 'rIO, wIO, tIO',
        mem: '*',
        osInfo: 'platform, arch, kernel',
        system: 'model, manufacturer',
        currentLoad: '*',
    })
    send(res, 200, data)
}
export default s

new Server(s).listen(2211)
