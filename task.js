class Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.baseSalary = baseSalary;
        this.experience = experience;
    }

    get countedSalary() {
        let salary = this.baseSalary;
        if (this.experience > 5) {
            salary = this.baseSalary * 1.2 + 500;
        } else if (this.experience > 2) {
            salary += 200;
        }
        return salary;
    }
}

class Developer extends Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        super(firstName, lastName, baseSalary, experience);
    }
}

class Designer extends Employee {
    constructor(firstName, lastName, baseSalary, experience, effectCoeff) {
        super(firstName, lastName, baseSalary, experience);
        this.effectCoeff = effectCoeff;
    }

    get countedSalary() {
        return super.countedSalary * this.effectCoeff;
    }
}

class Manager extends Employee {
    constructor(firstName, lastName, baseSalary, experience, team = []) {
        super(firstName, lastName, baseSalary, experience);
        this.team = team;
    }

    get countedSalary() {
        let salary = super.countedSalary;
        const teamSize = this.team.length;

        if (teamSize > 10) {
            salary += 300;
        } else if (teamSize > 5) {
            salary += 200;
        }

        const developerCount = this.team.filter(member => member instanceof Developer).length;
        if (developerCount > teamSize / 2) {
            salary *= 1.1;
        }

        return salary;
    }
}

class Department {
    constructor(managers = []) {
        this.managers = managers;
    }

    giveSalary() {
        const allEmployees = [];
        this.managers.forEach(manager => {
            allEmployees.push(manager);
            allEmployees.push(...manager.team);
        });

        allEmployees.forEach(employee => {
            document.writeln(`${employee.firstName} ${employee.lastName} отримав ${employee.countedSalary.toFixed(2)} шекелів<br>`);
        });
    }
}

// Приклад використання
const developer1 = new Developer('John', 'Doe', 3000, 6);
const developer2 = new Developer('Jane', 'Smith', 2800, 3);
const designer1 = new Designer('Emily', 'Johnson', 3500, 4, 0.9);
const manager1 = new Manager('Alice', 'Williams', 4000, 10, [developer1, developer2, designer1]);

const department = new Department([manager1]);
department.giveSalary();
