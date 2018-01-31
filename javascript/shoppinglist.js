const getShoppingList = () => {
	const ShoppingList = {
		list: {item:[], price:[]},
		addToList: (item, price) => {
			ShoppingList.list.item.push(item);
			ShoppingList.list.price.push(price);

			return ShoppingList.list;	
		},
		editItemInList: (index, newItemValue) => {

			if (index < 0 || index > ShoppingList.countItemsInList()) {
				return;
			}

			if (newItemValue === '' || newItemValue.trim() === '') {
				return;
			}

			ShoppingList.list.item[index] = newItemValue;
		},
		editPriceInList: (index, newItemPrice) => {

			if (index < 0 || index > ShoppingList.countItemsInList()) {
				return;
			}

			if (newItemPrice === '' || newItemPrice.trim() === '') {
				return;
			}

			ShoppingList.list.price[index] = newItemPrice;
		},
		removeFromList: (listItem, listPrice) => {
			ShoppingList.list.item = ShoppingList.list.item.filter((currentItem) => {
				return currentItem !== listItem;
			});
			ShoppingList.list.price = ShoppingList.list.price.filter((currentPrice) => {
				return currentPrice !== listPrice;
			});

			return ShoppingList.list;
		},
		countItemsInList: () => {
			return ShoppingList.list.item.length;
		}
	};	

	return ShoppingList;
};

const myShoppingList = getShoppingList();

const render = (container, shoppingList) => {
	let str = '';
	let sum = 0;
	for (let i = 0; i < shoppingList.countItemsInList(); i++) {
		str += `<li>
			<span class="js-shopping-list-listitem" data-idx="${i}">${shoppingList.list.item[i]}</span><span>:</span>
			<span>$</span><span class="js-shopping-list-price" data-idx="${i}">${shoppingList.list.price[i]}</span>
			<span class="js-delete-btn btn btn-primary" data-idx="${i}">X</span>
		</li>`;
		sum += parseFloat(shoppingList.list.price[i]);
	}

	container.innerHTML = `<ol>${str}</ol><div class="total-container"><span>Total: $</span><span class="js-total">${sum}</span></div>`
}

// EVENT LISTENERS
const onAddToListClicked = (evt) => {
	const inputValue = shoppingListInput.value;
	const inputPrice = Number(shoppingListPrice.value);
	if (inputValue !== '' && inputPrice !== '' && isNaN(inputPrice) === false) {

		shoppingListInput.value = '';
		shoppingListPrice.value = '';

		myShoppingList.addToList(inputValue, inputPrice);
		render(shoppingListCont, myShoppingList)
	}
} 

const onEnterKeyPressed = (evt) => {
	const inputValue = shoppingListInput.value;
	const inputPrice = shoppingListPrice.value;
	if (evt.keyCode === 13 && inputValue !== '' && inputPrice !== '' && isNaN(inputPrice) === false) {
		shoppingListInput.value = '';
		shoppingListPrice.value = '';

		myShoppingList.addToList(inputValue, inputPrice);
		render(shoppingListCont, myShoppingList)
	}
} 

const onContainerClicked = (evt) => {
	
	if (evt.target.matches('.js-delete-btn')) {
		const idx = evt.target.getAttribute('data-idx');
		const itemContainer = document.querySelector('.js-shopping-list-listitem[data-idx="'+idx+'"]');
		const priceContainer = document.querySelector('.js-shopping-list-price[data-idx="'+idx+'"]');
		console.log(itemContainer.innerHTML, priceContainer.innerHTML)
		myShoppingList.removeFromList(itemContainer.innerHTML, priceContainer.innerHTML);
		render(shoppingListCont, myShoppingList);
	}
	else if (evt.target.matches('.js-shopping-list-listitem')) {
		const idx = evt.target.getAttribute('data-idx');
		evt.target.innerHTML = `<input type="text" 
			class="form-control js-edit-listitem" 
			data-idx="${idx}"
			placeholder="${evt.target.innerHTML}">`;
		evt.target.querySelector('input').focus()
	}
	else if (evt.target.matches('.js-shopping-list-price')) {
		const idx = evt.target.getAttribute('data-idx');
		evt.target.innerHTML = `<input type="text" 
			class="form-control js-edit-price" 
			data-idx="${idx}"
			placeholder="${evt.target.innerHTML}">`;
		evt.target.querySelector('input').focus()
	}
}

const onContainerKeyPressed = evt => {
	if (evt.keyCode === 13 && evt.target.matches('.js-edit-listitem')) {
		const newItemValue = evt.target.value;
		const idx = parseInt(evt.target.getAttribute('data-idx'), 10);
		myShoppingList.editItemInList(idx, newItemValue);
		render(shoppingListCont, myShoppingList);
	}
	else if (evt.keyCode === 13 && evt.target.matches('.js-edit-price')) {
		const newPriceValue = evt.target.value;
		const idx = parseInt(evt.target.getAttribute('data-idx'), 10);
		myShoppingList.editPriceInList(idx, newPriceValue);
		render(shoppingListCont, myShoppingList);
	}
}

// INIT VARIABLES
const shoppingListInput = document.querySelector('.js-shopping-list-item');
const shoppingListPrice = document.querySelector('.js-shopping-price');
const addToList = document.querySelector('.js-add-to-list');
const shoppingListCont = document.querySelector('.js-shopping-list-container')
const formCont = document.querySelector('.js-form-container')

// EVENT HANDLERS
addToList.addEventListener('click', onAddToListClicked);
formCont.addEventListener('keypress', onEnterKeyPressed);
shoppingListCont.addEventListener('click', onContainerClicked);
shoppingListCont.addEventListener('keypress', onContainerKeyPressed);

