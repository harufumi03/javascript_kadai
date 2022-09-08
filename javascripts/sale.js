const products = [
	{
		id: 1,
		coffee: "オリジナルブレンド200g",
		price: 500,
	},
	{
		id: 2,
		coffee: "スペシャルブレンド200g",
		price: 700,
	},
	{
		id: 3,
		coffee: "オリジナルブレンド500g",
		price: 900,
	},
	{
		id: 4,
		coffee: "スペシャルブレンド500g",
		price: 1200,
	}
]
const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];


function add() {
  const targetId = parseInt(priceElement.value);
	const product = products.find(item => item.id == targetId);
  const number = parseInt(numberElement.value);
  
	let purchase = {
    product: product,
    number: number,
  };
  
	const newPurchase = purchases.findIndex((item) => item.id === purchase.product.id)
  if(purchases.length < 1 || newPurchase === -1) {
    purchases.push(purchase)
  } else {
    purchases[newPurchase].number += purchase.number
  }

  window.alert(`${display()}\n小計${subtotal()}円`);
  priceElement.value = "";
  numberElement.value = "";
}

function display() {
  return purchases.map(purchase => {
    return `${purchase.product.coffee}${purchase.product.price}円:${purchase.number}点`
  }).join("\n");
};

function subtotal() {
  return purchases.reduce((prev, purchase) => {
    return prev + purchase.product.price * purchase.number; 
  }, 0);
}

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  window.alert(`${display()}\n小計は${sum}円、送料は${postage}円です。合計は${sum + postage}円です`);
  purchases = [];
  priceElement.value= "";
  numberElement.value = "";
}

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 1000){
   return 500;
  } else {
   return 250;
  }
}