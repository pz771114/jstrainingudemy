var budgetController = (function () {
    
	var Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
	var Income = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
	var data = {
		
		allItems:{
			exp:[],
			inc:[]
		},
		
		totals:{
			exp:0,
			inc:0
		}
		
	};
	
	return {
		addItem: function(type, des, val){
			var newItem;
			var lastItemIndex = data.allItems[type].length-1;
			
			//create a new id
			if( data.allItems[type].length > 0 ){
				id = data.allItems[type][lastItemIndex].id+1;
			}else
			{
				id = 0;
			}
				

			//create a new item based on 'exp' or 'inc' type
			if(type === 'exp'){
				newItem = new Expense(id,des,val);
				
			} else if(type === 'inc') {
				newItem = new Income(id,des,val);
				
			}
			
			//Push it into our data structure
			data.allItems[type].push(newItem);
			
			//Return the new item
			return newItem;
			
		},
		
		testing: function(){
			console.table(data);
		}
		
	};
	
})();



var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__list',
		addContainer:'.add__container'
    };

    return {
        getInput: function () {

            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };

        },

        getDOMStrings: function () {
            return DOMStrings;
        },
		
		addListItem: function(obj, type){
			//1. create the html
			var html;
			if(type ==='exp'){
				element = DOMStrings.expenseContainer;
				
				html =`<div class="item clearfix" id="expense-${obj.id}">
							<div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">- ${obj.value}</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
				
			}else if(type ==='inc'){
				element = DOMStrings.incomeContainer;
				
				html=`<div class="item clearfix" id="income-${obj.id}">
                            <div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">+ ${obj.value}</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
			}
			
			//2. replace the html
			
			document.querySelector(element).insertAdjacentHTML('beforeend',html);
			
			//3. clear the input fields
			var inputs = document.querySelector(DOMStrings.addContainer).querySelectorAll('input');
			var inputsArray = Array.prototype.slice.call(inputs);
			inputsArray.forEach(function(input){
				input.value = '';
			});
		}
    };
})();

//global app controller
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListener = function () {
        var DOM = UICtrl.getDOMStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    
    var ctrlAddItem = function () {
		var input, newItem;
        //1.get the field input data

        input = UIController.getInput();
        console.log(input);

        //2.add the item into the budget controller
		
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		
		console.log(newItem);
		
        //3.add the item to the UI
		
		UICtrl.addListItem(newItem,input.type);
        //4.calculate the budget
        //5.display the budget on the UI

    };
	
	
	return {
		init: function(){
			console.log('app starts');
			setupEventListener();
		}
	};

})(budgetController, UIController);

controller.init();