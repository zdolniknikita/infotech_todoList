const mongoose = require('mongoose')
const { dbConfig } = require('config')
const storage = require('node-persist')

const User = require('./models/user')
const Todo = require('./models/todos') 


const db = mongoose.connect(
    `${dbConfig.protocol}${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`, 
    {
        useNewUrlParser: true, 
        useFindAndModify: false, 
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    err => {
        if (err) throw err
    })

    const login =  async (user) => {
        const { username, password } = user
        
            User.findOne({ username })
            .then( async user => {
                if ( user ) {
                    if( user.password === password ) {

                        let localUser = {
                            _id: user._id,
                            username: user.username
                        }
                        
                        if ( username === 'admin' && password === 'admin' ) {
                            localUser['isAdmin'] = true
                        }

                        await storage.init()

                        await storage.setItem('user', localUser)
                        console.log(`Вы вошли в систему под пользователем ${username} `)

                    } else console.log('Неверное имя логина или пароль')
                } else console.log('Пользователь с таким логином не найден')
            })
        

    }

    const register = async (user) => {
        const { username, password } = user

        let findUser = await User.findOne({ username })

        if ( findUser ) return console.log('Пользователь с таким логином уже существует')

        let newUser = new User({ username, password })

            await newUser.save(async err => {
                if ( err ) throw err

                let user = {
                    _id: newUser._id,
                    username: newUser.username
                }

                if ( username === 'admin' && password === 'admin' ) {
                    user['isAdmin'] = true
                }

                await storage.init()
                await storage.setItem('user', user)

                console.log(`Пользователь ${username} зарегистрирован`)
                
            })
    }
    

    const addTodo = async title => {
        
        if ( !title ) return console.log('Введите текст тудушки...')
        
        await storage.init()

        let user = await storage.getItem('user')

        if ( !user ) return console.log('Зарегестрируйтесь или войдите в систему!')

        let todo = new Todo({ title: title, user: user._id })
            await todo.save(() => console.log('Тудушка сохранена)'))
            
    }
    
    const logout = async () => {
        await storage.init()
        await storage.removeItem('user')
            .then(() => console.log('Пользователь вышел с системы'))
        
       
    }

    const getList = async () => {
        await storage.init()

        let user = await storage.getItem('user')
        let findQuery = {}

        if ( !user ) return console.log('Зарегестрируйтесь или войдите в систему')

        if ( !user.isAdmin ) {
            findQuery = {
                user: user._id
            }
        }

        await Todo.find(findQuery, { user: 0, __v: 0 })
            .then(console.log)

        
    }

    const deleteTodo = async id => {
        
        await storage.init()

        let user = await storage.getItem('user')

        if ( !user ) return console.log('Зарегестируйтесь или войдите в систему!')

        let query = {
            _id: id._id
        }

        if ( !user.isAdmin ) {
            query['user'] = user._id
        } 

        Todo.findByIdAndDelete(query)
            .then((todo) => {
                if (!todo) return console.log(`Тудшка с айди ${ id._id } не найдена`)
                console.log(`Тудушка c тайтлом "${todo.title}" удалена`)
                
            })
    }

    const updateTodo = async todo => {
        const { _id, title, isdone } = todo
        
        await storage.init()
        let user = await storage.getItem('user')

        if ( !user ) return console.log('Зарегестируйтесь или войдите в систему!')

        let query = {
            _id
        }

        if ( !user.isAdmin ) {
            query['user'] = user._id
        }
        
        Todo.findOneAndUpdate(query, { title, isdone })
            .then(todo => {

                if ( !todo ) return console.log('Тудушка с таким айди не найдена')

                console.log('Тушка обновлена')
                
            })
    }

module.exports = {
    addTodo,
    register,
    logout,
    login,
    getList,
    deleteTodo,
    updateTodo
}