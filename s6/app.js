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
		},
		budget:0,
		income_percentage:-1,
		expense_percentage:-1
		
	};
	
	return {
		addItem: function(type, des, val){
			
			var newItem;
			var lastItemIndex = 0 ;
			
			//create a new id
			if( data.allItems[type].length > 0 ){
				id = data.allItems[type][data.allItems[type].length-1].id+1;
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
		
		calculateBudget: function(type){
			var sum = 0;
			data.allItems[type].forEach(function(item){
				sum += item.value;
			});	
			
			data.totals[type] = sum;
			
			data.budget = data.totals['inc'] - data.totals['exp'];
			if(data.totals['inc'] > 0)
			{
				data.expense_percentage = Math.round(data.totals['exp'] /data.totals['inc'] * 100);
				//data.income_percentage = Math.round(data.totals['exp'] /data.totals['inc'] * 100);
			}
		},
		
		getBudget: function(){
			
			var budget = {
				income: data.totals.inc,
				expense: data.totals.exp,
				income_percentage: data.income_percentage,
				expense_percentage: data.expense_percentage,
				budget: data.budget
			};
			
			return budget;
		},
		
		testing: function(){
			return (data);
		},
		
		deleteItem: function(type, id){
			var ids=[], index,item;
			ids = data.allItems[type].map(function(item){
				return item.id;
			});
			
			index = ids.indexOf(id);
			if(index !== -1){
				data.allItems[type].splice(index,1);
			}
			
		},
		getData:function(){
			return data.allItems;
		},
		setData: function(newData){
			data.allItems = newData;
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
		addContainer:'.add__container',
		budgetValue:'.budget__value',
		budgetIncome:'.budget__income--value',
		budgetIncomePercentage:'.budget__income--percentage',
		budgetExpense:'.budget__expenses--value',
		budgetExpensePercentage:'.budget__expenses--percentage',
		container: '.container'
    };

    return {
        getInput: function () {

            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };

        },

        getDOMStrings: function () {
            return DOMStrings;
        },
		clearFields: function(){
			var inputs = document.querySelectorAll(DOMStrings.inputDescription + ','+DOMStrings.inputValue);
			var inputsArray = Array.prototype.slice.call(inputs);
			inputsArray.forEach(function(input){
				input.value = '';
			});
			
			inputsArray[0].focus();
		},
		addListItem: function(obj, type){
			//1. create the html
			var html;
			if(type ==='exp'){
				element = DOMStrings.expenseContainer;
				
				html =`<div class="item clearfix" id="exp-${obj.id}">
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
				
				html=`<div class="item clearfix" id="inc-${obj.id}">
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
			
			
		},
		
		removeItem: function(selector){
			
			var em = document.querySelector(selector);
			em.parentNode.removeChild(em);
		},
		
		displayBudget: function(budget){
			
			document.querySelector(DOMStrings.budgetValue).textContent=budget.budget;
			document.querySelector(DOMStrings.budgetIncome).textContent=budget.income;
			
			document.querySelector(DOMStrings.budgetExpense).textContent=budget.expense;
			if(budget.income > 0 )
			{
				document.querySelector(DOMStrings.budgetExpensePercentage).textContent=budget.expense_percentage+'%';
			}else{
				document.querySelector(DOMStrings.budgetExpensePercentage).textContent='---';
			}
			
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
		
		document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
    };
	
	var ctrlDeleteItem = function(event){
		id = event.target.parentNode.parentNode.parentNode.parentNode.id;
		
		
		
		if(id){
		//1. delete the item from the data structure
			itemType = id.split('-')[0];
			itemID = parseInt(id.split('-')[1]);
			selector = '#'+ itemType +'-'+itemID;
			
			budgetCtrl.deleteItem(itemType,itemID);
		
		//2. delete the item from UI
			UICtrl.removeItem(selector);
			
		//3. Update and show the new budget
		
			updateBudget();
		}
	};
	
    var updateBudget = function(){
		//1.calculate the budget
		
		budgetCtrl.calculateBudget('exp');
		budgetCtrl.calculateBudget('inc');
		
		
        //2.return the budget
		var budget = budgetCtrl.getBudget();
		
		
		//3.display the budget on the UI
		UICtrl.displayBudget(budget);
		

	};
	
    var ctrlAddItem = function () {
		var input, newItem;
        //1.get the field input data

        input = UIController.getInput();
        
		if(input.description !== '' && !isNaN(input.value) && input.value > 0){

			//2.add the item into the budget controller
			
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);
			
			//3.add the item to the UI
			
			UICtrl.addListItem(newItem,input.type);
			
			//4.clear the fields
			UICtrl.clearFields();
			
			//5.update budget
			updateBudget();
        }
    };
	
	
	return {
		init: function(){
			console.log('app starts');
			setupEventListener();
			
			//reset data to all zero
			UICtrl.displayBudget({
				income: 0,
				expense: 0,
				income_percentage: 0,
				expense_percentage: -1,
				budget: 0
			});
		}
	};

})(budgetController, UIController);

controller.init();