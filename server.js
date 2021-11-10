var express = require('express');
var app = express();
var path = require('path');


app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');


var mysql = require('mysql');
var fs = require('fs');
console.log("here");

console.log(__dirname);
require('custom-env').env('dev', __dirname);
console.log(process.env.CONNECTIONS_URL);
var base_url=process.env.BASE_URL;
const json = require('body-parser/lib/types/json');
eval(fs.readFileSync(process.env.CONNECTIONS_URL)+''); 

var model=require(process.env.MODEL_URL);

console.log(model);















app.get('/meet',async (req,res)=>{
    var  BM_Content_Sent = req.query.id;
  
    if(typeof BM_Content_Sent=='undefined')
    {
        res.send('<center><h1>Invalid Meeting</h1></center>');
    }
  let sql="SELECT BM_Name FROM buyers_master WHERE BM_Content_Sent ='"+BM_Content_Sent+"' and Status='B'";
    console.log(" I am here " + BM_Content_Sent);
  const result=await model.sqlPromise(sql);
    if(typeof result!='undefined' && result!=null)
    {
        console.log(result);
        //let nameMeeting='Testing meeting';
        let password='12345';
        if(result.length > 0)
        {            
            res.render('pages/meeting',{nameMeeting:BM_Content_Sent,password:password,title:' Expy | Video Session'});
        }
        else
        {
              res.sendFile('/var/www/html/app/404.html')
        }
  
                                    
    }
    else
    {
             res.sendFile('/var/www/html/app/404.html')
    }
  })
  
  
  
  
  
  
  
  app.get("/404", (req, res) => {
  
  res.setHeader('Content-Type', 'text/html');
  res.send("<h1>Not found</h1>");
            // const filePath = path.resolve(__dirname, '404.html');  
            //  fs.readFile(filePath, 'utf8', function (err,data) 
            //     {
            //                   if (err) {
            //                     return console.log(err);
            //                   }
            //                     res.send(data);
            //                 });
    //res.sendFile('/home/velectic/node_code/app/404.html');
  });
  
  
  app.get("/:url/:id", async (req, res) => {
  
  var url = req.params.url;
  var id = req.params.id;
  
    console.log(url + " " + id);
    console.log('visited! ' + url);
  
      var xss = require("xss");
    var html = xss('<script>alert("xss");</script>');
    console.log(html);
          
  
    const filePath = path.resolve(__dirname, './build', 'index.html');  
  
      var JM_User_Profile_Url=url;     
  
      JM_User_Profile_Url=await removeSpecialChar(JM_User_Profile_Url);
      JM_User_Profile_Url=JM_User_Profile_Url.replace(/\s/g, '')
      console.log(JM_User_Profile_Url)
  
      var myquery = "SELECT * FROM joining_master WHERE JM_User_Profile_Url = '" + JM_User_Profile_Url+"'  and  isDeleted=0 and isBlocked=0";
      connection.query(myquery , function (error, results, fields) {
          if (error)
          {
            
            console.log(error)
              res.json({
                status:0,
                msg:"unable to excecute process",
                error:"error"
                })
          }
          else
          {
              if(results.length > 0)
              {
  
  
                    if(id=='gift')
                        {
                  
                          console.log('inside result --> ' + url);
  
                            var JM_ID=results[0].JM_ID;
                            var JM_Name=results[0].JM_Name;
                            var JM_Profile_Pic=results[0].JM_Profile_Pic;                      
                            fs.readFile(filePath, 'utf8', function (err,data) 
                            {
                              if (err) {
                                return console.log(err);
                              }
  
                              JM_Name = xss(JM_Name);
  
                              data = data.replace(/\$OG_TITLE/g, JM_Name + "- Gift | Expy ");
  
                              data = data.replace(/\$OG_DESCRIPTION/g, "Everything about "+JM_Name+" in one place. Follow and Connect!");
        
                              result = data.replace(/\$OG_IMAGE/g,base_url+'adm/uploads/'+ JM_Profile_Pic);
                              res.send(result);
  
                            });
                    }
                    else
                    {                     
                        res.sendFile('/home/velectic/node_code/app/404.html');  
                    }
  
  
              } 
              else 
              {
  
    
                    var filepath2=path.resolve(__dirname,'./build',url);
                    res.sendFile(filepath2);
                 //	res.sendFile('/home/velectic/node_code/app/404.html');
  
              }
          }
      });
  
  });
  
  
  
  app.get("/:url", async (req, res) => {
  
     const Fullurl = getFullUrl(req);
    console.log("getFullUrl");
    console.log(Fullurl);
  
   var url = req.params.url;
  
    var xss = require("xss");
    var html = xss('<script>alert("xss");</script>');
    console.log(html);
  
  
  
    if(url.includes('.'))
     {
      console.log('inside if --> ' + url);
  
      var filepath2=path.resolve(__dirname,'./build',url);
      res.sendFile(filepath2);
  
  
    }
  else
  {
      console.log('visited! ' + url);
  
          const filePath = path.resolve(__dirname, './build', 'index.html');  
    
          var JM_User_Profile_Url=url;     
          JM_User_Profile_Url=await removeSpecialChar(JM_User_Profile_Url);
          JM_User_Profile_Url=JM_User_Profile_Url.replace(/\s/g, '')
          console.log(JM_User_Profile_Url)
          
          var myquery = "SELECT * FROM joining_master WHERE JM_User_Profile_Url = '" + JM_User_Profile_Url+"'  and  isDeleted=0 and isBlocked=0";
          connection.query(myquery , function (error, results, fields) {
          if (error)
           {
                console.log('inside error --> ' + url);
                res.json({
                status:0,
                msg:"unable to excecute process",
                error:"error"
                })
          }
          else
          {
              if(results.length > 0)
              {
  
                       console.log('inside result --> ' + url);
  
                          var JM_ID=results[0].JM_ID;
                 
                         var JM_Profile_Pic=results[0].JM_Profile_Pic;
               var JM_Name=results[0].JM_Name;
                fs.readFile(filePath, 'utf8', function (err,data) 
              {
                            if (err) {
                              return console.log(err);
                            }
  
  
                JM_Name = xss(JM_Name);
  
                            data = data.replace(/\$OG_TITLE/g, JM_Name + " | Expy ");
  
                            data = data.replace(/\$OG_DESCRIPTION/g, "Everything about "+JM_Name+" in one place. Follow and Connect!");
      
                           result = data.replace(/\$OG_IMAGE/g, process.env.BASE_URL+'adm/uploads/'+ JM_Profile_Pic);
  
                            res.send(result);
  
  
  
                          });
  
  
              } 
       else // how-it-works
              {
             const filePath = path.resolve(__dirname, './build', 'index.html');  
                  
  
                     
            fs.readFile(filePath, 'utf8', function (err,data) 
              {
                            if (err) {
                              return console.log(err);
                            }
  
  
                            data = data.replace(/\$OG_TITLE/g,  " Expy: Ultimate Homepage For Creators & Influencers ");
  
                            data = data.replace(/\$OG_DESCRIPTION/g, "Use Expy to SHARE all your content, MONETIZE in any way you want, ENGAGE your followers and COLLABORATE with ambitious creators via 1 Bio-Link page.");
  
                           result = data.replace(/\$OG_IMAGE/g, process.env.BASE_URL+'adm/uploads/Logo_Expy.jpg');
  
                            res.send(result);
  
  
  
                          });
          
              }
    
  
          }
      });
  
  }
  
      
  
  
  })
  
  
  
  
  /**
  * Gets the self full URL from the request
  * 
  * @param {object} req Request
  * @returns {string} URL
  */
  const getFullUrl = (req) => `${req.protocol}://${req.headers.host}${req.originalUrl}`;
  
  
  
  app.get('/', async function(req, res) {
  
  console.log('root,,,....!');
  console.log(req.params);
             const filePath = path.resolve(__dirname, './build', 'index.html');  
                  
  
                     
            fs.readFile(filePath, 'utf8', function (err,data) 
              {
                            if (err) {
                              return console.log(err);
                            }
  
  
                            data = data.replace(/\$OG_TITLE/g,  " Expy: Ultimate Homepage For Creators & Influencers ");
  
                            data = data.replace(/\$OG_DESCRIPTION/g, "Use Expy to SHARE all your content, MONETIZE in any way you want, ENGAGE your followers and COLLABORATE with ambitious creators via 1 Bio-Link page.");
  
                           result = data.replace(/\$OG_IMAGE/g, process.env.BASE_URL+'adm/uploads/Logo_Expy.jpg');
  
                            res.send(result);
  
  
  
                          });
  
  });
  
  
  
  
  
  app.use(express.static(path.resolve(__dirname, './build')));
  
  
  app.get('*', async function (req, res) { 
  
  const filePath = path.resolve(__dirname, './build', 'index.html');
  res.sendFile(filePath);
  
  });
  
  
  
  async function removeSpecialChar(str)
  {
      
      str=str.replace(/[^A-Za-z0-9_-]/g, "");
      console.log(str);
      return str;
  }



app.listen(2080, function () {
console.log('Example app listening on port 2080!');
});