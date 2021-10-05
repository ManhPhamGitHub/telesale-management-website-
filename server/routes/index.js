const controllerProfile = require('../controller/profile')
const controllerItem = require('../controller/item')
const middleware = require('../middleware/index')
module.exports = (app) => {

    // Profile
    app.route('/profile')
        .get(middleware.verifyToken, controllerProfile.getProfile)
        .post(controllerProfile.addProfile)
    app.route('/profile/:id')
        .put(controllerProfile.updateProfile)
    app.route('/register')
        .post(controllerProfile.registerProfile)
    app.route('/login')
        .post(controllerProfile.loginProfile)

    // Item 
    app.route('/item')
        .get(controllerItem.getItem)
        .post(controllerItem.addItem)
    app.route('/item/:id')
        .put(controllerItem.updateItem)

    app.route('/search')
        .post(controllerItem.searchItem)
    app.route('/item/delete')
        .post(controllerItem.deleteItem)
    
}