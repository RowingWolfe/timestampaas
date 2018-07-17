//Skulljack labs Timestamp service

const express = require('express');
const moment = require('moment');
const app = express();

const port = 3000;
let time = moment();
const dateFormat = "dddd, M/D/YYYY H:mm:ss a";

app.get('/api/timestamp', (req, res, next) => {
    res.send({'unix': time.valueOf(), 'utc': time.format(dateFormat)});
});

app.get('/api/timestamp/:timestring/', (req, res, next)=> {
    if(req.params.timestring){
        time = moment(req.params.timestring).valueOf();
    }

    let parsedTime = moment(time).format(dateFormat);

    if( parsedTime === 'Invalid date'){
        res.send({'error': 'Invalid date'})
    }else{
        res.send({'unix':time, 'utc': parsedTime});
    }
});

app.listen(port);