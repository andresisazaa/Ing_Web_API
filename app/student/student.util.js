const rules = {
    GREATER_THAN: 'GREATER_THAN',
    LESS_THAN: 'LESS_THAN',
    EQUALS_TO: 'EQUALS_TO'
};

const validateRule = (rule) => {
    return Boolean(rule && rules.hasOwnProperty(rule));
}

const validateGrade = (grade) => {
    const type = typeof grade === "number";
    const range = Boolean(0 <= grade && grade <= 5);
    return Boolean(type && range);
}

const getStudentsToUpdate = (students, rule, currentGrade) => {
    let studentsToUpdate = [];
    switch (rule) {
        case rules.GREATER_THAN:
            studentsToUpdate = students.filter(s => s.grade > currentGrade);
            break;
        case rules.LESS_THAN:
            studentsToUpdate = students.filter(s => s.grade < currentGrade);
            break;
        case 'EQUALS_TO':
            studentsToUpdate = students.filter(s => s.grade === currentGrade);
            break;
    }
    return studentsToUpdate;
}

module.exports = {
    validateRule,
    validateGrade,
    getStudentsToUpdate
};