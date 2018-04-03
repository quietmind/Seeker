const axios = require('axios')

const sendReminder = (packet) =>{
  let user = packet.user
  let reminder = packet.reminder
  let rootUrl = 'https://api.elasticemail.com/v2/email/send?apikey=11247b43-8015-4e70-b075-4327381d0e0f'
  let subject = `&subject="HEY! DON'T FORGET TO..."`
  let sender = '&from=' + 'adammateo@gmail.com'
  let senderName = '&fromName' + 'Seeker'
  let receiver = '&to=' + `${user}` //donaters email address
  let message = '&bodyText=' + 'Hey there, you have asked us to remind you about ' + reminder + '. \n\n Thanks for using Seeker! \n\n'
  let isTransactional = '&isTransactional=true'

  let URL = rootUrl + subject + sender + senderName + receiver + message + isTransactional

  axios.post(URL)
  .then((response) => {
    console.log('email sent')
  })
  .catch((err) => {
    throw(err)
  })
}

module.exports = sendReminder
