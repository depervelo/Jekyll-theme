var _background = {
	minNumber : 1,
	maxNumber : 45,
	fixedNumbers : [],
	exclusionNumbers : [],
	execNumber : [],
	init : function() {
		this.rander();
		this.script();
	},
	rander : function() {
		var self = this;

		var innerHTML = '';
		for (var i = self.minNumber, j = self.maxNumber; i <= j; i++) {
			innerHTML += '<div class="lotto-number" data-check="N" data-number="' + i + '">';
			innerHTML += '	<i class="fas fa-square"></i>';
			innerHTML += '	<i class="fas fa-check text-success"></i>';
			innerHTML += '	<i class="fas fa-times text-danger"></i>';
			innerHTML += '</div>';
		}
		$('.lotto-numbers').html(innerHTML);
	},
	script : function() {
		var self = this;

		$(document).on('click', '.lotto-number', function() {
			self.clickLotto(this);
		});

		$(document).on('click', '.autoBtn', function() {
			self.execLotto();
		});

		$(document).on('click', '.resetBtn', function() {
			self.resetLotto();
		});
	},
	clickLotto : function(el) {
		var self = this;

		var checkVal = $(el).attr('data-check');
		var number = parseInt($(el).attr('data-number'));
		if(checkVal === 'N') {
			if(self.fixedNumbers.length === 6) {
				self.fixedNumbers.shift();
			}
			self.fixedNumbers.push(number);
		} else if(checkVal === 'T') {
			self.fixedNumbers.splice(self.fixedNumbers.indexOf(number), 1);
			self.exclusionNumbers.push(number);
		} else {
			self.exclusionNumbers.splice(self.exclusionNumbers.indexOf(number), 1);
		}
		self.renderCheckNumber();
	},
	execLotto : function() {
		var self = this;

		var numbers = [];
		while(self.fixedNumbers.length + numbers.length < 6) {
			var number = Math.floor((Math.random() * (self.maxNumber - self.minNumber)) + self.minNumber);
			if(self.fixedNumbers.indexOf(number) > -1) {
				continue;
			} else if(self.exclusionNumbers.indexOf(number) > -1) {
				continue;
			} else if(numbers.indexOf(number) > -1) {
				continue;
			}
			numbers.push(number);
		}

		numbers.sort(function(a, b) {
			return a - b;
		});
		self.execNumber = numbers;
		self.renderAutoNumber();
	},
	clearLotto : function() {
		var self = this;
		$('.lotto-number').attr('data-check', 'N');
		$('.lotto-content').removeClass('checked');
		self.execNumber = [];
	},
	resetLotto : function() {
		var self = this;

		self.clearLotto();
		self.fixedNumbers = [];
		self.exclusionNumbers = [];
		self.checked();
	},
	renderCheckNumber : function() {
		var self = this;

		self.clearLotto();
		for (var i = 0, j = self.fixedNumbers.length; i < j; i++) {
			var number = self.fixedNumbers[i];
			$('.lotto-number[data-number="' + number + '"]').attr('data-check', 'T');
		}
		for (var i = 0, j = self.exclusionNumbers.length; i < j; i++) {
			var number = self.exclusionNumbers[i];
			$('.lotto-number[data-number="' + number + '"]').attr('data-check', 'F');
		}
		self.renderResult();
	},
	renderAutoNumber : function() {
		var self = this;

		$('.lotto-number[data-check="Y"]').attr('data-check', 'N');
		for (var i = 0, j = self.execNumber.length; i < j; i++) {
			var number = self.execNumber[i];
			$('.lotto-number[data-number="' + number + '"]').attr('data-check', 'Y');
		}
		self.renderResult();
	},
	renderResult : function() {
		var self = this;

		var innerHTML = '';
		var numbers = self.fixedNumbers.concat(self.execNumber);
		numbers.sort(function(a, b) {
			return a - b;
		});

		for (var i = 0, j = numbers.length; i < j; i++) {
			var number = numbers[i];
			var className = '';
			if(number < 11) {
				className = 'text-yellow';
			} else if(number < 21) {
				className = 'text-blue';
			} else if(number < 31) {
				className = 'text-red';
			} else if(number < 41) {
				className = 'text-gray';
			} else {
				className = 'text-green';
			}
			innerHTML += '<div class="lotto-ball ' + className + '">' + number + '</div>';
		}
		$('.lotto-ball-groups').html(innerHTML);
		self.checked();
	},
	checked : function() {
		var self = this;

		if(self.fixedNumbers.length + self.exclusionNumbers.length + self.execNumber.length > 0) {
			$('.lotto-content').addClass('checked');
		} else {
			$('.lotto-content').removeClass('checked');
		}

		if(self.fixedNumbers.length + self.execNumber.length > 0) {
			$('.lotto-result').addClass('checked');
		} else {
			$('.lotto-result').removeClass('checked');
		}
	},
};

$(document).ready(function() {
	_background.init();
});