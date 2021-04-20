const sequelize = require('sequelize');


//koa 框架所以這個形式, 與sequelize本身無關
module.exports = async (ctx, next) => {    
    
    ////創建 sequelize , 
    counst sequelize = new Sequelize('database(schema)', 'username', 'password', {
      host: 'localhost',
      dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',

      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
  // 仅 SQLite 适用
  storage: 'path/to/database.sqlite'
});
    
    //定義 model , 即entity
    var Chatroom = sequelize.define('chatroom',{
        chatroom_id:{
            type: Sequelize.INTEGER, //
            primaryKey: true,  //設定pk, 若沒指定pk會自動增設欄位 id 做為 pk
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
          },
        title: Sequelize.STRING,
        create_date:Sequelize.BIGINT,
        enabled: Sequelize.TINYINT
    },{freezeTableName: true //table 名稱設定不要自動加s ex: chatrooms})

    
    Chatroom.findOne({
        where:{
            title:'aaa'
        }
    })


    //事務控制
    // sequelize.transaction((t)=>{

    // })
    

    ctx.status = 200
    ctx.body = {
        status: 'success'
    }

}
