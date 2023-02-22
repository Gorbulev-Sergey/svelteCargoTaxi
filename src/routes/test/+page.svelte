<script>
	// @ts-nocheck	
    Object.prototype.hass = function() {
				console.log(10);
			};

	class Person {
		constructor(name = '', lastname = '', age = 0) {
			this.name = name;
			this.lastname = lastname;
			this.age = age;
		}

		isEquals(pred) {
			if (pred(this) === true) return 'да';
			else return 'нет';
		}

		has(pred) {
			if (pred(this)) return 'содержится';
			else return 'не содержится';
		}
	}	
	let person = new Person('Сергей', 'Горбулёв', 20);
    
    person.hass();
</script>

<div>
	{person.isEquals(i => i.age == 20)},
	{person.has(i => i.age)}
</div>
