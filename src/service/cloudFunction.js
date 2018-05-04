import axios from 'axios'

export default {
  getDailyReport: dateString => axios.get(`https://us-central1-tn-line-hackathon.cloudfunctions.net/get?date=${dateString}`),
  // sendToLine: msg => axios.post('http://localhost:3002/report'),
  // saveDiary: msg => axios.post('http://localhost:3002/report')
}