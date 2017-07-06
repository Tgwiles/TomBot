var config = require('../../config/config'),
    request = require('request'),
    rp = require('request-promise');

module.exports = {

  getUserName: function getUserName(sender) {
    return rp({
      url: 'https://graph.facebook.com/v2.6/' + sender,
      qs: {
        access_token: config.page_access_token,
        fields: "first_name,last_name"
      },
      method: 'GET'
    })
    .then (function(data) {
      return JSON.parse(data);
    });
  },

  sendTextMessage: function sendTextMessage(sender, text) {
    messageData = {
      text:text
    };
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:config.page_access_token},
      method: 'POST',
      json: {
        recipient: {id: sender},
        message: messageData
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending messages: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    });
  },

  sendGenericMessage: function sendGenericMessage(sender) {
    messageData = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Feeling down?",
            "subtitle": "Option #1",
            "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
            "buttons": [{
              "type": "web_url",
              "url": "http://weavesilk.com/",
              "title": "Peaceful Website"
            }, {
              "type": "postback",
              "title": "Postback",
              "payload": "Payload for first element in a generic bubble",
            }],
          }]
        }
      }
    };
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:config.page_access_token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageData,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    });
  },


// Sends small button prompts that disappear after the user enters an answer (Up to 11 button choices)
  sendQuickReply: function sendQuickReply(sender){
  messageData = {
    text: 'Please choose a department: ',
    quick_replies: [
      { content_type: 'text', title: 'HR', payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED' },  // Work out how to use payload!!!!
      { content_type: 'text', title: 'IT', payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN' },
      { content_type: 'text', title: 'Marketing', payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN' }, 
      { content_type: 'text', title: 'Sales', payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN' },
      { content_type: 'text', title: 'Business', payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN' },
      { content_type: 'text', title: 'I don\'t know all the departments', payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN' }
    ],
  };
  request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:config.page_access_token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageData,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    });
  },

// Sends small button prompts that disappear after the user enters an answer (Up to 11 button choices)
  sendITReply: function sendITReply(sender){
  messageData = {
    text: 'What topic is your question related to?: ',
    quick_replies: [
      { content_type: 'text', title: 'Login Trouble', payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED' },  // Work out how to use payload!!!!
      { content_type: 'text', title: 'Exporting Docs', payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN' },
      { content_type: 'text', title: 'Laptop issue', payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN' }, 
      { content_type: 'text', title: 'iPhone/iPad', payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN' },
      { content_type: 'text', title: 'Other', payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN' }
    ],
  };
  request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:config.page_access_token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageData,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    });
  }
}



