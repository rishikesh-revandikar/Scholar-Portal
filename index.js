const express= require("express");
const app = express();

app.set('view engine','ejs');

const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"));

var con =require("./connection.js");


var sql="select * from d2";
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
    if (err) throw err;
   // console.log("Result: " + result);
  });
});

app.get("/index",function(req,res){res.sendFile(__dirname+"/public/HTML/index.html")});
app.get("/login",function(req,res){res.sendFile(__dirname+"/public/HTML/login.html")});
app.get("/signup",function(req,res){res.sendFile(__dirname+"/public/HTML/signup.html")});
app.get("/filter",function(req,res){res.sendFile(__dirname+"/public/HTML/filter1final.html")});
app.get("/",function(req,res){res.sendFile(__dirname+"/public/HTML/homepage.html")});
app.get("/profile",function(req,res){res.sendFile(__dirname+"/public/HTML/profile.html")});



app.post("/login",function(req,res)
{
  var email = req.body.email;
  var password=req.body.password;
  
  var sql1="select * from login where login_id='"+email+"';";
  con.query(sql1, function (err, result) {
    if (err) throw err; 
    if(password==result[0].password)
    {console.log("match found");
   // res.sendFile(__dirname+"/public/HTML/filter1.html")
   res.redirect("/filter");
     }
    else{console.log("match not found");
    res.sendFile(__dirname+"/public/HTML/loginfailure.html")
  }

  });
}
);
app.post("/signup",function(req,res)
{
  console.log(req.body);
  var email = req.body.email;
  var password1=req.body.password1;
  var password2=req.body.password2;
  if(password1==password2)
  {
    var sql2="insert into login(login_id,password) value ('"+email+"','"+password1+"');";
    con.query(sql2, function (err, result) {
    if(err){
      console.log(err);
    }

    res.redirect("/filter");
  
  });
}else{}
});

var temp=[];

app.post("/filter",function(req,res)
{
  console.log('filter route post');
  console.log(req.body);
  var qualification= req.body.qualification;
  var category=req.body.category;
  var income=req.body.income;
  var grade=req.body.grade;
  var state=req.body.state;

// let c1,c2,c3,c4,c5;
 let c1 =  qualification === "all" ? "" : "AND (qualification='"+qualification+"' OR qualification IS NULL)"
 let c2 =   category === "all" ? "" : "AND (category='"+category+"' OR category IS NULL)"
 let c3 = income === "all" ?   "" : "AND (l_limit<"+income+" OR l_limit IS NULL) AND (u_limit>"+income+" OR u_limit IS NULL)"
 let c4 = grade === 'all' ? "" : "AND (grade>="+grade+" OR grade IS NULL)"
 let c5 = state === 'all' ? "" : "(state='"+state+"')"

 console.log("Values : " , c1, c2,c3,c4,c5);

//   if(qualification==='all'){c1="";}
//   else{c1="AND (qualification='"+qualification+"' OR qualification IS NULL)"}

//   if(category==='all'){c2="";}
//   else{c2="AND (category='"+category+"' OR category IS NULL)";}

//   if(income==='all'){c3="";}
//   else{c3="AND (l_limit<"+income+" OR l_limit IS NULL) AND (u_limit>"+income+" OR u_limit IS NULL)";}

//   if(grade==='all'){c4="";}
//   else{c4="AND (grade>="+grade+" OR grade IS NULL)";}

//   if(state==='all'){c5="";}
//   else{c5="(state='"+state+"')";}

//  var sql2="select * from d2 where qualification='"+qualification+"' AND category='"+category+"';";

//  var sql3=" select name,state,link,l_limit,u_limit,category,qualification,grade,sp_cri from d2 where state='"+state+"' AND (category='"+category+"' OR category IS NULL) AND (qualification='"+qualification+"' OR qualification IS NULL) AND (grade>="+grade+" OR grade IS NULL) AND (l_limit<"+income+" OR l_limit IS NULL) AND (u_limit>"+income+" OR u_limit IS NULL) ;";

//  var sql4=" select name,state,link,l_limit,u_limit,category,qualification,grade,sp_cri from d2 where(state='"+state+"') AND (category='"+category+"' OR category IS NULL) AND (qualification='"+qualification+"' OR qualification IS NULL) AND (grade>="+grade+" OR grade IS NULL);";

  var sql5=" select name,state,link,l_limit,u_limit,category,qualification,grade,sp_cri from d2 where"+c5+c1+c2+c3+c4+";";
  
  console.log(sql5);
       
      con.query(sql5, function (err, result1) {
        try{
          if (err) throw err; 
        temp=result1;
        console.log(temp);
  
        }
        catch(err){

          console.log(err);
        }
        
        
        res.render("filterfinal",{abc:temp}) ;  
        
      
      });


    });

// app.post("/profile",function(req,res)
// {
  
  
  
//   con.query(sql1, function (err, result) {
//     if (err) throw err; 
//     if(password==result[0].password)
//     {console.log("match found");
//    // res.sendFile(__dirname+"/public/HTML/filter1.html")
//    res.redirect("/filter");
//      }
//     else{console.log("match not found");
//     res.sendFile(__dirname+"/public/HTML/loginfailure.html")
//   }

//   });
// });

app.listen(3000,function(){console.log("Server is running")})