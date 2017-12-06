var express=require('express');
var app= express();
var bodyparser=require('body-parser');

var products=[
{
    id:1,
    name:'Bed'
},
{
    id:2,
    name:'Microwave'
}

];

var currentId=2;

var PORT=process.env.PORT || 3000;
app.use(express.static(__dirname)); //root folder
app.use(bodyparser.json());// allows to read data inside the request

app.get('/products',function(req,res){//route to the data
res.send({products:products});
});

app.post('/products',function(req,res){
var productName=req.body.name;
currentId++;
products.push({
    id:currentId,
    name:productName,
});
res.send('Successfully created the product');
});


app.put('/products/:id',function(req,res){
    
var id=req.params.id;//parameters
var newName=req.body.newName;
var found= false;

products.forEach(function(product,index){
    if(!found && product.id===Number(id) ){
           product.name=newName;
    }
    
});

res.send('Successfully updated the product');
});

app.delete('/products/:id',function(req,res){
var id=req.params.id;
var found= false;

products.forEach(function(product,index){
console.log(index);
    if(!found && product.id===Number(id)){
        products.splice(index,1);
    }
});

res.send("successfully deleted the product");
});

app.listen(PORT,function(){
console.log("server listening on "+ PORT);
});