console.log('Hi!')

let form = document.getElementById('myForm')

form.addEventListener('submit',(event)=>{
    //prevent refresh
    event.preventDefault()

    weatherFunction()
})

let  weatherFunction = async ()=>{
    try{
        const address = document.getElementById('address').value
        const  res = await fetch("http://localhost:3000/weather?address=" +  address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            document.getElementById('error').innerText=data.error
            document.getElementById('location').innerText=''
            document.getElementById('forecast').innerText=''
        }
        else{
            document.getElementById('error').innerText=''
            document.getElementById('location').innerText=data.location
            document.getElementById('forecast').innerText=data.forcast
        }
    }
    catch(e){
        console.log(e)
    }
}