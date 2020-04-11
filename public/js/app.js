const weatherform=document.querySelector('form')
const search = document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')
//msg1.textContent = 'from js'
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value
    msg1.textContent='Loading....'
    msg2.textContent=''
    fetch('http://localhost:3002/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msg1.textContent=data.error
            return console.log(data.error)
        }
        msg1.textContent=data.location
        msg2.textContent=data.forecast
        // console.log(data.location)
         console.log(data)
    })  
})

    //console.log(location)
})