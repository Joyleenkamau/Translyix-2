const WebSocket = require('ws')
const PORT = process.env.PORT || 4050

const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`WS server listening on ${PORT}`)
})

function randomReport(){
  const id = 'r' + Math.floor(Math.random()*100000)
  const regions = ['Greater Accra','Central Region','Ashanti','Northern']
  const sev = ['low','medium','high']
  const region = regions[Math.floor(Math.random()*regions.length)]
  return {
    type: 'report',
    payload: {
      id,
      region,
      coords: { lat: 5 + Math.random()*2, lng: -2 + Math.random()*2 },
      severity: sev[Math.floor(Math.random()*sev.length)],
      timestamp: Date.now()
    }
  }
}

function randomAlert(region){
  return {
    type: 'alert',
    payload: {
      id: 'a' + Math.floor(Math.random()*100000),
      region,
      message: 'Maintenance recommended based on recent patterns.'
    }
  }
}

wss.on('connection', (ws) => {
  console.log('client connected')
  const id = setInterval(()=>{
    const r = randomReport()
    ws.send(JSON.stringify(r))
    if(Math.random() < 0.25) ws.send(JSON.stringify(randomAlert(r.payload.region)))
  }, 3000)
  ws.on('close', ()=> {
    clearInterval(id)
    console.log('client disconnected')
  })
})