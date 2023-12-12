const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

var mysql = require("mysql2");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sahil@2003",
    database: "Restaurant",
});

const PORT = process.env.PORT || 5000;

con.connect(function(err) {
    if (err) {
    console.error('Database connection error: ' + err.stack);
    return;
    }
    console.log('Connected to the database as ID ' + con.threadId);
});


app.get("/api", (req, res) => {
    res.json({ message: "Hello from Express!" });
});

app.post("/api/search",(req,res)=>{
    const qry=req.body.query;
    let query;
    if(qry.length===0){
        query="select * from Menu";
    }
    else{
        query="select * from Menu where Name like "+`"%${qry}%"`;
    }
    con.query(query,function(err,result){
        if(err) throw err;
        res.json(result);
    })
});

app.get("/api/data", (req, res) => {
    con.query("select * from Menu",function(err,result){
        if (err) throw err;
        res.json(result);
    });
});

app.get("/api/categories", (req, res) => {
    con.query("select distinct Category from Menu",function(err,result){
        if (err) throw err;
        var categories=result.map((row) => row.Category);
        res.json(categories);
    });
});


app.post("/api/1/order", (req, res) => {
    const ind = req.body.idx;
    let query;
    const mode=req.body.mode;
    query = "select Quantity from Ordertab where food_id = ? and table_no = 1  and status='Ordered'";
    con.query(query, [ind+1], (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
        if(mode==="inc"){
        if (results.length === 0) {
            // If no results found, insert a new row
            query = "insert into Ordertab (food_id, table_no, status, time, Quantity) values ?";
            const values = [[ind+1, 1, "Ordered", new Date(), 1]];
            con.query(query, [values], (err, insertResult) => {
                if (err) {
                    throw err;
                }
                console.log(insertResult);
                    res.json({"qty": 1 });
            });
        } else {
            // If results found, update the existing row
            query = "update Ordertab set Quantity = Quantity + 1 where food_id = ? and table_no = 1 and status='Ordered'";
            con.query(query, [ind+1], (err, updateResult) => {
                if (err) {
                    throw err;
                }
                console.log(updateResult);
                    res.json({"qty": results[0].Quantity + 1 });
            });
        }
    }
    else{
        if(results.length===0){
            res.json({"idx":0});
        }
        else{
            if(results[0].Quantity===1){
                query="delete from Ordertab where food_id= ? and table_no = 1 and status='Ordered'";

                con.query(query, [ind+1], (err, updateResult) => {
                    if (err) {
                        throw err;
                    }
                    con.query("alter table Ordertab auto_increment=1",(err,ans)=>{
                        if(err) throw err;
                        res.json({"qty": 0 });
                    })
                    console.log(updateResult);
                        
                });
            }
            else{
            query = "update Ordertab set Quantity = Quantity - 1 where food_id = ? and table_no = 1 and status='Ordered'";
            con.query(query, [ind+1], (err, updateResult) => {
                if (err) {
                    throw err;
                }
                console.log(updateResult);
                    res.json({"qty": results[0].Quantity - 1 });
            });
        }
        }
    }
    });
});



app.get("/api/1/getcart",(req,res)=>{
    const query="select Ordertab.order_id,Ordertab.food_id,Ordertab.Quantity,Menu.Name,Menu.Price,Menu.Image,Menu.Subcategory,Menu.Category from Ordertab,Menu where Ordertab.food_id=Menu.ID and Ordertab.table_no=1 and Ordertab.status='Ordered'";
    con.query(query,(err,result)=>{
        if(err) throw err;
        res.json(result);
    });
});


app.get("/api/1/quantity",(req,res)=>{
    con.query("select Menu.Id,Ordertab.Quantity from Menu left join Ordertab on Ordertab.food_id=Menu.ID and Ordertab.table_no=1 and Ordertab.status='Ordered'",(err,result)=>{
        if(err) throw err;
        var categories=result.map((row) => (row.Quantity !==null?row.Quantity:0));
        con.query("select count(Quantity) as TQ, sum(Ordertab.Quantity * (select Price from Menu where Menu.ID=Ordertab.food_id))as TP from Ordertab where Ordertab.table_no=1 and Ordertab.status='Ordered'",(err,ans)=>{
            if(err) throw err;
            res.json({"quantity":categories,"TQ":ans[0].TQ,"TP":ans[0].TP});
        })
    });

});

app.get("/api/1/order",(err,res)=>{
    const query="update Ordertab set status='Served' where table_no=1 and status='Ordered'";
    con.query(query,(err,result)=>{
        if(err) throw err;
        const quer="select Ordertab.order_id,Ordertab.food_id,Ordertab.Quantity,Menu.Name,Menu.Price,Menu.Image,Menu.Subcategory,Menu.Category from Ordertab,Menu where Ordertab.food_id=Menu.ID and Ordertab.table_no=1 and Ordertab.status='Ordered'";
        con.query(quer,(err,result)=>{
            if(err) throw err;
            res.json(result);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
