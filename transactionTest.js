const sequelize = require('../../../../../infra/utils/database')
const { QueryTypes, Sequelize } = require('sequelize');
const errorMessage = require('../../../../../infra/utils/errorMessageMap');
const Joi = require('joi');





/**
 * 後台介面 -> 聊天室設定 -> 增加聊天室使用者
 */
module.exports = async (ctx, next) => {

    let title = ctx.request.body.title;
    
    
    
    //事務測試
    var Chatroom = sequelize.define('chatroom',{
        chatroom_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
          },
        title: Sequelize.STRING,
        create_date:Sequelize.BIGINT,
        enabled: Sequelize.TINYINT
    },{freezeTableName: true})

    
    Chatroom.findOne({
        where:{
            title:'aaa'
        }
    })



    // sequelize.transaction((t)=>{

    // })
    

    ctx.status = 200
    ctx.body = {
        status: 'success'
    }

}
