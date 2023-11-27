const User = require("./User");
const Objective = require("./Objective");
const TransactionType = require("./TransactionType");
const Expense = require("./Expense");
const InCome = require("./InCome");
const EmailCode = require("./EmailCode");

//InCome => UsersId
InCome.belongsTo(User) 
User.hasMany(InCome)


//Objective => UsersId
Objective.belongsTo(User)
User.hasMany(Objective)

//TransactionType => ExpensesId
TransactionType.belongsTo(Expense)
Expense.hasMany(TransactionType)

//TransactionType => InComeId
TransactionType.belongsTo(InCome)
InCome.hasMany(TransactionType)

//Expenses => UsersId
Expense.belongsTo(User) 
User.hasMany(Expense)


EmailCode.belongsTo(User); //userId
User.hasOne(EmailCode);

