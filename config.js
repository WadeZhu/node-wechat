'use strit'

var path= require('path')
var util = require('./libs/util')
var wechat_file= path.join(__dirname, './config/wechat.txt')

var config={
	wechat: {
		appID: 'wxc0e80a9ed15c3049',
		appSecret: 'dd063b7e2b71de04f3b219df1b6eaa98',
		token: 'thisismytoken',
		getAccessToken: function(){
			return util.readFileAsync(wechat_file)
		},
		saveAccessToken: function(data){
			data= JSON.stringify(data)
			
			return util.writeFileAsync(wechat_file, data)
		}
	}
}

module.exports= config