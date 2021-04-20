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
       
    //匯入 已寫好的 model
    const Chatroom_user = sequelize.import("./schema/chatroom_user")
    
    Chatroom.findOne({
        where:{
            title:'aaa'
        }
    })


    //事務控制
    //例子1 完成自動commit
    sequelize.transaction((t)=>{
        return Chatroom_user.create({ 
            chatroom_id: chatroom_id, 
            create_date: date, 
            user_id: user_id, 
            role_id: role_id }, { transaction: t })
            .then(d => {
                //業務邏輯 %%%%
                ///-----
                return Chatroom_user.findAll({/*搜尋條件*/},{ transaction: t})
            .then();
        });
    })//沒有EXCEPTION 則自動COMMIT
    
    // 例子2 噴錯回滾
    sequelize.transaction((t)=>{
        return Chatroom_user.create({/**/ }, { transaction: t })
            .then(d => {                
                return Chatroom_user.findAll({/*搜尋條件*/},{ transaction: t})
                .then(f =>{
                    thrwo(400) // 噴錯則事務rollback
                });
        });
    })
    
    

    ctx.status = 200
    ctx.body = {
        status: 'success'
    }

}
