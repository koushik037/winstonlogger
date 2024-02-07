import express  from'express'
import 'dotenv/config'
import logger from './winstonconfig.js'
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve(path.dirname(''))
const app = express()
const port= process.env.PORT || 3010

app.get('/',(req,res)=>{
   
  logger.info(`success, route:${req.url}, ip: ${req.socket.remoteAddress}`)//add more req.querry,req.body

   var option = {
       root: path.join(__dirname, 'log'),
       headers: {
           'x-timestamp': Date.now(),
           'accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
           'x-sent': true
       }
   }
   try {
       res.sendFile('combined-1-2024.log', option, (err) => {
           if (err) {
               console.log(err)
           } else {
               console.log('file send success')
           }
       })
   } catch (error) {

       console.log(`Error worth logging: ${error}`); // special case for some reason

   }
   
})


app.get('/logger',(req,res)=>{
    logger.info(`success, route:${req.url}, ip: ${req.socket.remoteAddress}`)

    var option = {
        root: path.join(__dirname, 'log'),
        headers: {
            'x-timestamp': Date.now(),
            'accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            'x-sent': true
        }
    }
    try {
        res.sendFile('combined-1-2024.log', option, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('file send success')
            }
        })
    } catch (error) {

        console.log(`Error worth logging: ${error}`); // special case for some reason

    }

})

app.listen(port,()=>{
    console.log(`server start at port ${port}`)
})