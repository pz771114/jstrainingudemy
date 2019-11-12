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
	
})();



var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
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
        //1.get the field input data

        var input = UIController.getInput();
        console.log(input);

        //2.add the item into the budget controller
        //3.add the item to the UI
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