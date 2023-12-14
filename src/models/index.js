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

//TransactionType => userId
TransactionType.belongsTo(User)
User.hasMany(TransactionType)

//TransactionType => ExpensesId
Expense.belongsTo(TransactionType)
TransactionType.hasMany(Expense)

//TransactionType => InComeId
InCome.belongsTo(TransactionType)
TransactionType.hasMany(InCome)

//Expenses => UsersId
Expense.belongsTo(User) 
User.hasMany(Expense)


EmailCode.belongsTo(User); //userId
User.hasOne(EmailCode);

