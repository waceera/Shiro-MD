import fetch from 'node-fetch'
import { format } from 'util'

let handler = async (m, { text, conn }) => {
    if (!text) return m.reply(`Example : .get https://google.com

Example With Options :
- GET : .get https://google.com --method GET --headers 'User-Agent: curl/7.68.0'
- POST : .get https://google.com --method POST --headers 'Content-Type: application/json' --data '{"key": "value", "key2": "hello world"}'
- Set Cookie : .get https://google.com --cookie 'key=value; key2=value2'
- Set Proxy : .get https://google.com --proxy http://user:password@host:port
- Get Redirect URL : .get https://google.com --redirect
- Get Headers : .get https://google.com --head

Available Options :
--method - for set method
--headers - for set headers
--data - for set data body
--redirect --direct - get redirect url
--cookie - for set cookie
--head - for get headers`)
    let args = text.split(' ')
    let url = args[0]
    if (!/^https?:\/\//.test(url)) throw 'Awali *URL* dengan http:// atau https://'
    let method = 'GET'
    let headers = {}
    let body = null
    let redirect = false
    let getHeaders = false
    let cookie = null
    let proxy = null
    for (let i = 1; i < args.length; i++) {
        let arg = args[i]
        if (arg === '--method' && args[i + 1]) method = args[i + 1].toUpperCase()
        if (arg === '--headers' && args[i + 1]) {
            try {
                headers = JSON.parse(args[i + 1])
            } catch {
                headers = { 'Custom-Header': args[i + 1] }
            }
        }
        if (arg === '--data' && args[i + 1]) body = args[i + 1]
        if (arg === '--redirect' || arg === '--direct') redirect = true
        if (arg === '--head') getHeaders = true
        if (arg === '--cookie' && args[i + 1]) headers['Cookie'] = args[i + 1]
        if (arg === '--proxy' && args[i + 1]) proxy = args[i + 1]
    }
    let options = { method, headers, body }
    if (method === 'GET' || method === 'HEAD') delete options.body
    let res = await fetch(url, options)
    if (redirect) return m.reply(res.url)
    if (getHeaders) return m.reply(format(res.headers.raw()))
    if (!/text|json/.test(res.headers.get('content-type'))) 
        return conn.sendFile(m.chat, url, 'file', `Downloaded: ${url}`, m)
    let txt = await res.text()
    try {
        txt = format(JSON.parse(txt))
    } catch {
        txt = txt
    } finally {
        m.reply(txt.slice(0, 65536))
    }
}

handler.help = ['fun']
handler.tags = ['owner']
handler.command = /^fun|get$/i
handler.owner = true
export default handler