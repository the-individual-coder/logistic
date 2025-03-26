const mysql = require('mysql');


const db = mysql.createPool({
    host: 'bvni3tbl8qdidniqw3f9-mysql.services.clever-cloud.com',
    user:'utopmk8f4wp4k7jl',
    password:'en1hR0RcUsRu4EN6U9kX',
    database: "bvni3tbl8qdidniqw3f9",
    port:3306
})

module.exports = async (query) => {
return new Promise((resolve, reject)=>{
    db.getConnection((err, connection)=>{
        if(err) reject(err)
        connection.query(query, (err, results)=>{
            if(err) reject (err)
            else{
                resolve(results)
                connection.release()
        }
           
            })
    })


})
    
}