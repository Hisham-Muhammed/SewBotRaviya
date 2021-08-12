/* Codded by @Ravindu Manoj

Telegram: t.me/RavinduManoj
Facebook: https://www.facebook.com/ravindu.manoj.79

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

Whats bot - Ravindu Manoj
*/

const QueenSew = require('../events');
const config = require('../config');
const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});
let baseURI = '/apps/' + config.HEROKU.APP_NAME;

   var l_dsc = ''
    var alr_on = ''
    var alr_off = ''
    var BGM_on = ''
    var BGM_off = ''
    
    if (config.LANG == 'EN') {
        l_dsc = 'turn on and turn of voice reply. -bot owner command'
        alr_on = 'Antilink is already open!'
        alr_off = 'Antilink is currently closed!'
        BGM_on = 'voice reply option turned on!'
        BGM_off = 'voice reply option turned off'
    }
    if (config.LANG == 'si') {
        l_dsc = 'Mengaktifkan alat Antilink.'
        alr_on = 'Antilink sudah terbuka!'
        alr_off = 'Antilink saat ini ditutup!'
        BGM_on = 'voice reply option turned on'
        BGM_off = 'voice reply option turned off'
    }
    QueenSew.newcmdaddtosew({pattern: 'voicereply ?(.*)', fromMe: true, desc: l_dsc, usage: '.voicereply on / off' }, (async (message, match) => {
        if (match[1] == 'off') {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['VOICE_REPLY']: 'false'
                    } 
                });
                await message.sendMessage(BGM_off)
        } else if (match[1] == 'on') {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['VOICE_REPLY']: 'true'
                    } 
                });
                await message.sendMessage(BGM_on)
        }
    }));
