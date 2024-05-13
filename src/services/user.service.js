'use strict'

import { storageService } from './async-storage.service.js'
import { dbService } from './db.service.js'

const KEY = 'user'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    query,
    get,
    remove,
    save,
    signup,
    getEmptyUser,
    logout,
    login,
    getSessionUser,
    addTransaction
}

async function query() {
    try {
        var users = await dbService.query(KEY)
        console.log('users: ', users)
        if (!users || !users.length) {
            users = _createDefaultUsers()
            await dbService.insert(KEY, users)
        }
        return users
    } catch (err) {
        throw err
    }
}

function get(userId) {
    return dbService.get(KEY, userId)
}

function remove(userId) {
    return dbService.remove(KEY, userId)
}

async function save(user) {
    try {

        if (user._id) return dbService.put(KEY, user)
        else return dbService.post(KEY, user)
    } catch (err) {
        console.log('err: ', err)
    }
}

async function login(userCred) {
    try {
        const users = await storageService.query('user')
        const user = users.find(user => user.username === userCred.username)
        if (user) {
             _saveLocalUser(user)
             return user
        }
    } catch (err) {
        throw err
    }
}

async function getSessionUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function signup(userCred) {
    const user = getEmptyUser()
    user.fullname = userCred.fullname
    user.username = userCred.username
    user.password = userCred.password
    user.imgUrl = userCred.imgUrl || 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704358773/person-empty_zckbtr_wrffbw.svg'

    try {
        await save(user)
        const loggedInUser = await login(userCred)
        return _saveLocalUser(loggedInUser)
    } catch (err) {
        console.error('Signup error:', err)
        throw err
    }
}


async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function createTransaction(contact, amount) {
    return {
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount: amount
    }
}


async function addTransaction(loggedInUser, contact, amount) {
    if (!amount) {
        throw new Error('Invalid transaction amount')
    }

    const transaction = await createTransaction(contact, amount)
    const updatedUser = { ...loggedInUser }

    console.log('updatedUser: ', updatedUser)
    console.log('transaction: ', transaction)
    if (!updatedUser.transactions) {
        updatedUser.transactions = []
    }
    updatedUser.transactions.unshift(transaction)
    console.log('updatedUser: ', updatedUser)

    _saveLocalUser(updatedUser)
    await save(updatedUser)
}

function getEmptyUser() {
    return {
        fullname: '',
        password: '',
        imgUrl: '',
        balance: 100,
        transactions: [],
        isAdmin: false
    }
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function _createDefaultUsers() {
    return [
        _createUser('Puki Muki', 'puki', 1234),
        _createUser('Admin', 'admin', 'admin'),
    ]
}

function _createUser(fullname, username, password, balance = 100) {
    return {
        fullname,
        username,
        password,
        balance,
        imgUrl
    }
}