const item = require('../model/item')
const profile = require('../model/profile')
const getItem = async (req, res) => {
    const getAll = req.query.getAll
    const employeeId = req.query.employeeId
    const time = `${new Date().toISOString().slice(0, 10)}T00:00:00.000Z` // lay time tinh tu 0h sang cua ngay hom nay
    // doan nay chua dc toi uu vi bi xu li lai lien tuc nhieu lan 
    // chi can chay khi o trang order
    const countDone = await item.countDocuments({ status: "DONE", createdAt: { $gte: time }, employee: employeeId })
    const countCancel = await item.countDocuments({ status: "CANCEL", createdAt: { $gte: time }, employee: employeeId })
    const countCallback = await item.countDocuments({ status: "CALLBACK", createdAt: { $gte: time }, employee: employeeId })
    /*   ****************   */

    if (getAll === "getAll") { // dung cho callback de get lai het tat ca du lieu
        const data = await item.find({ employee: employeeId, status: "CALLBACK" }, { "__v": 0 }).populate({
            path: 'employee',
            select: 'name'
        })
        return res.send({ get: data })
    }
    if (req.query.nextTime || req.query.prevTime) { // dung cho lich su cuoc goi 
        const nextTime = req.query.nextTime
        const prevTime = new Date(`${req.query.prevTime.slice(0, 10)}T00:00:00.000Z`) // lay time tinh tu 0h sang cua ngay vua chon
        const data = await item.find({
            createdAt: {
                $gte: prevTime,
                $lte: new Date(nextTime)
            },
            employee: employeeId
        }, { "__v": 0 }).populate({
            path: 'employee',
            select: 'name'
        })
        return res.send({ get: data })
    }


    const data = await item.find({
        createdAt: {
            $gte: time,
        },
        employee: employeeId
    }, { "__v": 0 }).populate({
        path: 'employee',
        select: 'name'
    })
    res.send({ "get": data, "countDone": countDone, "countCancel": countCancel, "countCallback": countCallback })
}
    


const addItem = async (req, res) => {
    const data = req.body
    const add = await item.create(data)
    await profile.findByIdAndUpdate(data.employee, { $addToSet: { order: add._id } })
    res.send({ "add": "add" })
}

const updateItem = async (req, res) => {
    try {
        const data = req.body
        const id = req.params.id
        const update = await item.findByIdAndUpdate(id, { $set: data.update })
        res.send({ "update": update })
    } catch (error) {
        res.send({ error: error })
    }
}

const deleteItem = async (req, res) => {
    try {
        const data = req.body
        for (var i in data) {
            await item.findByIdAndDelete(data[i])
        }
        res.send({ "delete": data })
    } catch (error) {
        res.send({ error: error })
    }
}

const searchItem = async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        const find = await item.find({
            
            /*phone:data.phone,
            price:data.price,
            customer:data.customer,
            location:data.location,
            shop:data.shop,
            region:data.region,
            sex:data.sex,
            note:data.note,
            statuts:data.status,
            createdAt: {
                $gte:  new Date(data.prevTime),
                $lt: new Date(data.nextTime)
            },*/
            employee:data.employee,
        })
        res.send({ "search": find })
    } catch (error) {
        //res.send({ "error": error })
    }
}


module.exports = {
    getItem,
    addItem,
    updateItem,
    deleteItem,
    searchItem,
    
}