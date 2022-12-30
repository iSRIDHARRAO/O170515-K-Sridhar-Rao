import express from 'express';
import axios from 'axios';
const PORT  = 3000;
const app = express();
const validate = (url)=>{
    const strToValidate = "http://:/"
    let i=0,j=0;
    while(i<url.length && j<strToValidate.length){
        if(url[i]==strToValidate[j]){
            j++;
        }
        i++;
    }

   return j==strToValidate.length;
    
}
function deleteDuplicates(inputArray) {
    var outputArray = [];
    inputArray.forEach(value => {
        if (!outputArray.includes(value)) {
            outputArray.push(value);
        }
    });
    return outputArray;
}



app.get('/',(req,res)=>{
    res.send("Home Page");
})
app.get('/numbers',async (req,res)=>{
    let index=0;
    var finalArray=[];
    let arrrayFinal = [];
    const start = Date.now();
    const urls = req.query.url;
    console.log(urls.length)
    for(let url of urls){
        console.log(url)
        let time = Date.now()-start;
        console.log(time)
        if(time>=500){
            break;
        }
        if(validate(url)){

            const response = await axios.get(url)
            
                for(let x of response.data.numbers){
                arrrayFinal.splice(index,0,x);
                index++;
                   
                }
        }
  
    }
    console.log("Data printing")
    console.log(arrrayFinal)
     arrrayFinal.sort((a, b) => a - b);
    res.send({
        "numbers":deleteDuplicates(arrrayFinal),
    })
})
app.listen(PORT,()=>{
    console.log("Server Started");
})