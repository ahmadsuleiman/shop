const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const objectId = mongoose.Schema.Types.ObjectId;

// parse application/json
app.use(bodyParser.json());

const db = mongoose.connect('mongodb://localhost/Shop',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let Tshirt = require("./model/Tshirt");
let Category = require("./model/Category");
let Order = require("./model/Order");


app.post("/tshirt",(req,res)=>{
    let shirt = new Tshirt();
    console.log(shirt);
    addItem(req.body,shirt);
    shirt.save((err,tshirt)=>{
        if(err){
            res.status(500).send({errror:"couldn't add tshirt"});
        }else{
            res.send(tshirt);
        }
    })
})

app.post("/category",(req,res)=>{
    let category = new Category();
    addItem(req.body,category);
    console.log(category);
    category.save((err,category)=>{
        if(err){
            res.status(500).send({errror:"couldn't add category"});
        }else{
            res.send(category);
        }
    })
})

app.get("/tshirt",(req,res)=>{
    Tshirt.find({}).populate({
        path:'TshirtCategoryID',
        model: 'Category',select:['CategoryName']
    }).exec((err,tshirts)=>{
        if(err){
            res.status(500).send({error:"can't find tshirts"});
        }else{
            res.send(tshirts);
        }   
    })
    //retrieveItem(Tshirt,req,res);
})

app.get("/category",(req,res)=>{
    Category.find({},(err,categories)=>{
        if(err){
            res.status(500).send({error:"can't find categories"});
        }else{
            res.send(categories);
        }
    });
    //retrieveItem(Category,req,res);
})

app.put("/tshirt",(req,res)=>{
    let thsirtId = req.body._id;
    let CustomerPhoneNumber = req.body.CustomerPhoneNumber;
    let orderNumber =req.OrderNumber;
    let order = new Order();
    Tshirt.findOne({_id : thsirtId},(err,tshirt)=>{
        if(err){
            res.status(500).send("can't find tshirt");
            console.log("----------------------------------------------");
        }else{
            console.log("////////////////////////////////////////////////");
            Tshirt.updateOne({_id:thsirtId},
                {$set: {NumberOfAvailableItems : tshirt.NumberOfAvailableItems-1}},
                (err,status)=>{
                    if(err){
                        res.status(500).send("couldn't update");
                    }else{
                        order.TshirtID = thsirtId;
                        order.CustomerPhoneNumber = CustomerPhoneNumber;
                        order.OrderNumber = OrderNumber;
                        order.OrderDateTime = new Date();
                        order.save((err,neworder)=>{                            
                            if(err){
                                console.log(order);
                                console.log(err);
                                res.status(500).send({error:"couldn't create order"});
                            }else{
                                res.send(neworder);
                            }
                        })
                    }
                })
        }
    })
})

function addItem(req,item){
    for(var key in req){
        if(key in item.schema.tree){
            item[key] = req[key];
        }
    }
    console.log(item);
}

/*function retrieveItem(item,req,res){
    item.find({},(err,items)=>{
        if(err){
            res.status(500).send({error:"can't find items"});
        }
        else{
            for(var i in items[0].schema.tree){
                console.log(items[0].schema.tree[i].type);
                console.log("i : "+i);
                if(i.type instanceof objectId)
                    console.log("Hello");
            }
            console.log('------------------------------------------------------');
            console.log(items[0].schema.tree);
            res.send(items[0]); 
        }
    });
}*/
app.listen(3000,function() {
    console.log("server is running on port 3000");
})