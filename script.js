let cart = [];

function scrollToMenu(){
  document.getElementById("menu").scrollIntoView({behavior:"smooth"});
}

function addToCart(name, price){
  let item = cart.find(i=>i.name===name);
  if(item) item.qty++;
  else cart.push({name,price,qty:1});
  displayCart();
}

function displayCart(){
  let html="";
  let total=0;

  cart.forEach((item,i)=>{
    let t=item.price*item.qty;
    total+=t;

    html+=`
    <tr>
      <td>${item.name}</td>
      <td>
        <button onclick="change(${i},-1)">-</button>
        ${item.qty}
        <button onclick="change(${i},1)">+</button>
      </td>
      <td>₹${t}</td>
      <td><button onclick="removeItem(${i})">❌</button></td>
    </tr>`;
  });

  document.getElementById("cart-items").innerHTML=html;
  document.getElementById("total").innerText=total;
}

function change(i,val){
  cart[i].qty+=val;
  if(cart[i].qty<=0) cart.splice(i,1);
  displayCart();
}

function removeItem(i){
  cart.splice(i,1);
  displayCart();
}

function clearCart(){
  cart=[];
  displayCart();
}

function filterItems(type){
  document.querySelectorAll(".card").forEach(card=>{
    card.style.display=(type==="all"||card.classList.contains(type))?"block":"none";
  });
}

function generateBill(){
  if(cart.length===0) return alert("Cart empty!");

  let name=document.getElementById("customer").value||"Customer";
  let date=new Date().toLocaleString();
  let total=0;

  let table=`<tr><th>Item</th><th>Qty</th><th>Total</th></tr>`;

  cart.forEach(item=>{
    let t=item.price*item.qty;
    total+=t;
    table+=`<tr><td>${item.name}</td><td>${item.qty}</td><td>₹${t}</td></tr>`;
  });

  document.getElementById("bill-name").innerText=name;
  document.getElementById("bill-date").innerText=date;
  document.getElementById("bill-table").innerHTML=table;
  document.getElementById("bill-total").innerText=total;

  document.getElementById("billModal").style.display="block";
}

function closeBill(){
  document.getElementById("billModal").style.display="none";
}

function printBill(){
  window.print();
}