'use strict'

var config= require('./config')
var Wechat = require('./wechat/wechat')
var wechatApi= new Wechat(config.wechat)

exports.reply= function *(next){
	var message = this.weixin
	
	if(message.MsgType === 'event'){
		if(message.Event === 'subscribe'){
			if (message.EventKey) {
				console.log('扫二维码进来'+ message.EventKey+ ' ' + message.ticket)
			}
			
			this.body= '哈哈，你订阅了这个号\r\n'+ '消息ID'+ message.MsgId	
		}else if(message.Event === 'unsubscribe'){
			console.log('哈哈哈，无情取关')
			this.body= ' '
		}else if(message.Event === 'LOCATION'){
			this.body= '您上报的地址是：'+message.Latitude+ '/' +message.Longitude+ '-' +message.Precision
		}else if(message.Event === 'CLICK'){
			this.body= '您点击了菜单：'+message.EventKey
		}else if(message.Event === 'SCAN'){
			console.log('关注后扫二维码' + message.EventKey + '' + message.Ticket)
			this.body= '看到你扫了一下哦'
		}else if(message.Event === 'VIEW'){
			this.body= '您点击了菜单的链接：'+ message.EventKey 
		}
		
	}else if(message.MsgType === 'text'){
		var content = message.Content
		var reply = '你说的' + message.Content + '太复杂了'
		if (content === '1') {
			reply = '天下第一大傻逼'
		} else if(content === '2'){
			reply = '天下第二是蠢货'
		} else if(content === '3'){
			reply = '天下第三吃仙丹'
		} else if(content === '4'){
			reply = [{
				title: '技术改变世界',
				description: '只是说说而已',
				picUrl: 'http://res.cloudinary.com/moveha/image/upload/v1441184110/assets/images/Mask-min.png',
				url: 'https://github.com'
			},{
				title: 'nodejs 开发微信',
				description: '真他妈爽',
				picUrl: 'http://res.cloudinary.com/moveha/image/upload/v1431337192/index-img2_fvzeow.png',
				url: 'https://nodejs.org'
			}]
		} else if(content === '5'){
			var data= yield wechatApi.uploadMaterial('image', __dirname + '/2.jpg')
			
			reply ={
				type: 'image',
				mediaId: data.media_id
			}
			console.log(reply)
		}
		
		this.body= reply
	}
	
	yield next
}
