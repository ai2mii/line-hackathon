import axios from 'axios'
const headers =  {'Access-Control-Allow-Origin': '*'}
   
export default {
  getDairyReport: dateString => axios.get('https://us-central1-tn-line-hackathon.cloudfunctions.net/get?date=2018-05-04', { headers }),
  // sendToLine: msg => axios.post('http://localhost:3002/report'),
  // saveDiary: msg => axios.post('http://localhost:3002/report')
}