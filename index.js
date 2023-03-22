let table1=document.getElementById('table1');
let table2=document.getElementById('table2');
let table3=document.getElementById('table3');

function savetoobject(event){
    event.preventDefault();
    let item=document.getElementById('item').value;
    let price=document.getElementById('price').value;
    let table=document.getElementById('table').value;

    const orders={
        item:item,
        price:price,
        table:table
    }

    axios
    .post('https://crudcrud.com/api/8e0d27976dcd48b58e228459993e5f54/orders',orders)
    .then((response)=>{
        console.log(response)
    })
    .catch((err)=>{
        li.appendChild(document.createTextNode('error:adding to database'))
        console.log(err)
    })
    display(orders)
    //console.log(orders)
}

function display(orders){
    
//CREATING LI ELEMENT
    let li=document.createElement('li');
    li.appendChild(document.createTextNode(`Item Name:${orders.item}__________Item Price: ${orders.price}`));

    if(orders.table==='table1') {
        table1.appendChild(li)
    }
    if(orders.table==='table2') {
        table2.appendChild(li)
    }
    if(orders.table==='table3') {
        table3.appendChild(li)
    } 


//DELETE BUTTON
    let deletebtn=document.createElement('button');
    deletebtn.innerText='Delete';
    deletebtn.onclick=()=>{
        if(orders.table==='table1') {
            table1.removeChild(li)
        }
        if(orders.table==='table2') {
            table2.removeChild(li)
        }
        if(orders.table==='table3') {
            table3.removeChild(li)
        } 
        
        axios
        .delete(`https://crudcrud.com/api/8e0d27976dcd48b58e228459993e5f54/orders/${orders._id}`)
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    li.appendChild(deletebtn)
    }

//WHENEVER THE PAGE GETS REFRESHED THERE WILL BE A GET REQUEST
    window.addEventListener('DOMContentLoaded',()=>{
        axios
        .get('https://crudcrud.com/api/8e0d27976dcd48b58e228459993e5f54/orders')
        .then((response)=>{
            console.log(response)
            for(let i=0; i<response.data.length;i++)
            {
                display(response.data[i])
                console.log(response.data[i])           
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    })