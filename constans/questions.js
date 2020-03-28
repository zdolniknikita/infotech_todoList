const addQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'Add new todo'
    }
]

const updateQuestions = [
    {
        type: 'input',
        name: '_id',
        message: 'Введите айди тудушки'
    },
    {
        type: 'input',
        name: 'title',
        message: 'Обновить тайтл'
    },
    {
        type: 'input',
        name: 'isdone',
        message: 'Выполнена тудушка? (true / false)'
    }
]



const authQuestions = [
    {
        type: 'input',
        name: 'username',
        message: 'Введите имя логина'
    },
    {
        type: 'input',
        name: 'password',
        message: 'Введите пароль'
    }

]

const deleteQuestions = [
    {
        type: 'input',
        name: '_id',
        message: 'Введите айди тудушки'
    },
]

module.exports = {
    addQuestions,
    updateQuestions,
    authQuestions,
    deleteQuestions
}