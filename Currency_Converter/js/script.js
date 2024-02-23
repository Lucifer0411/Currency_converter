

//Executes initially when page loads
function showData(){
   const response=fetch('https://openexchangerates.org/api/latest.json?app_id=46476186f66b47529e5d121137749903')
   .then((res)=>res.json())
   .then((data)=>data.rates)
   .then((rate)=>{
   let from,to

      for (const key in rate) {
            from=document.querySelector('#from')
            to=document.querySelector('#to')
            const newOptionForTo=document.createElement('option');
            const newOptionForFrom=document.createElement('option');
            newOptionForTo.innerHTML=key
            newOptionForFrom.innerHTML=key
            from.appendChild(newOptionForTo);
            to.appendChild(newOptionForFrom);
      }
      //set default value of select USD and INR
      from.value='USD'
      to.value='INR'

      //submit button handler
      handleClick(to,from,rate);

      //swap button handler
      swap(to,from,rate)
   })
   .catch((e)=>{
       console.log(e);
   })
   
}
showData();

//swap function 
function swap(to, from,rate){
   document.getElementById('swap').addEventListener('click',()=>{
      const temp=to.value
      to.value=from.value
      from.value=temp
      convertAmount(to,from,rate)
   })
}

//Function works after clicking convert button
function convertAmount(to,from,rate){
   const amount=document.getElementById('amount').value
   // console.log(`to ${to} from  ${from}`);
   const fromValue=(rate[to.value]);
   const toValue=(rate[from.value])
   const price=((fromValue/toValue)*amount).toFixed(2)
   document.querySelector('#result').value=price
}


function handleClick(to,from,rate){
   document.getElementById('submit').addEventListener('click',()=>{
      convertAmount(to,from,rate)
   })   
}


