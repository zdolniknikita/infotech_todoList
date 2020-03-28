#!/usr/bin/env node

const program = require('commander')
const { prompt } = require('inquirer')

const {
    addTodo,
    register,
    logout,
    login,
    getList,
    deleteTodo,
    updateTodo
} = require('../index')

const {
    addQuestions,
    updateQuestions,
    authQuestions,
    deleteQuestions
} = require('../constans/questions')



program
    .version('1.0.0')
    .description('Application suite to manage ToDoList')

program
    .command('add')
    .alias('a')
    .description('Добавить новую тудушку')
    .action(() => {
        prompt(addQuestions)
            .then(answers => addTodo( answers.title ))
    })

program
    .command('register')
    .alias('r')
    .description('Регистрация пользователя')
    .action(() => prompt(authQuestions).then(answers => register(answers)))

program
    .command('logout')
    .alias('lo')
    .description('Выйти из учетной записи')
    .action(logout)

program
    .command('login')
    .alias('l')
    .description('Войти в систему')
    .action(() => prompt(authQuestions).then(answers => login(answers)))

program
    .command('list')
    // .alias('l')
    .description('Список всех тудушек')
    .action(getList)

program
    .command('delete')
    // .alias('l')
    .description('Удалить тудушку по айди')
    .action(() => prompt(deleteQuestions).then(answers => deleteTodo(answers)))

program
    .command('update')
    // .alias('l')
    .description('Обновить тудушку')
    .action(() => prompt(updateQuestions).then(answers => updateTodo(answers)))
    
program.parse(process.argv)