
function getuserData(){
   const response=fetch('https://openexchangerates.org/api/latest.json?app_id=46476186f66b47529e5d121137749903')
   .then((res)=>res.json())
   .then((data)=>data.rates)
   .then((rate)=>{
      let baseCurr,tarCurr
      for (const key in rate) {
            // console.log(key);
            baseCurr=document.querySelector('#baseCurr')
            tarCurr=document.querySelector('#tarCurr')
            const newele=document.createElement('option');
            const tarEle=document.createElement('option');
            tarEle.innerHTML=key
            newele.innerHTML=key
            baseCurr.value='USD'
            tarCurr.value='INR'
            baseCurr.appendChild(newele);
            tarCurr.appendChild(tarEle);
      }
      document.getElementById('swap').addEventListener('click',()=>{
         const temp=baseCurr.value
         baseCurr.value=tarCurr.value
         tarCurr.value=temp;
         convertAmount();
      })
   })
   .catch((e)=>{
       console.log(e);
   })
   
}
getuserData();

function convertAmount(){
   const amount=document.getElementById('amount').value
   const tarCurr=document.getElementById('tarCurr').value
   const baseCurr=document.getElementById('baseCurr').value
   fetch('https://openexchangerates.org/api/latest.json?app_id=46476186f66b47529e5d121137749903')
   .then((res)=>res.json())
   .then((data)=>data.rates)
   .then((rate)=>{
         const tarValue=(rate[tarCurr]);
         const baseValue=(rate[baseCurr])
         // console.log(baseValue);
         const price=((tarValue/baseValue)*amount).toFixed(2)
         // const price=(amount*String(rate.)/tarValue).toFixed(2);
         console.log(price);
         document.querySelector('#result').value=price
   })
}
document.getElementById('submit').addEventListener('click',()=>{
   convertAmount();
})