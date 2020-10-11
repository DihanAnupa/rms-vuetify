import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/retrieveItems");
  }

  get(itemName) {
    return http.get(`/retrieveItems/${itemName}`);
  }

  create(data) {
    return http.post("/addItems", data);
  }

  update(id, data) {
    return http.put(`/updateItems/${id}`, data);
  }

  delete(id) {
    return http.delete(`/deleteItem/${id}`);
  }

  deleteAll() {
    return http.delete(`/retrieveItems`);
  }

  //////////////////////////////////////Employee CRUD////////////////////////////////////////////////
  //Add chef
  addEmployeeChef(data) {
    return http.post("/addEmployee/chef", data)
  }

  //Add inventory manager
  addEmployeeInvManager(data) {
    return http.post("/addEmployee/InventoryManager", data)
  }

  //Add restaurant manager
  addEmployeeRestManager(data) {
    return http.post("/addEmployee/RestaurantManager", data)
  }

  //Add cashier
  addEmployeeCashier(data) {
    return http.post("/addEmployee/cashier", data)
  }

  //Retrieve All Employees
  //Retrieve all chefs
  getAllChefs(){
    return http.get("retrieveEmployee/Chefs")
  }

  //Retrieve all cashiers
  getAllCashiers(){
    return http.get("retrieveEmployee/Cashiers")
  }

  //Retrieve all Restaurant Managers
  getAllRestaurantManagers(){
    return http.get("retrieveEmployee/RestaurantManagers")
  }

  //Retrieve all inventory managers
  getAllInventoryManagers(){
    return http.get("retrieveEmployee/InventoryManagers")
  }

  //Update Employee Chef
  updateEmployeeChef(id, data) {
    return http.put(`/updateEmployeeChef/${id}`, data);
  }

  //Update Employee Cashier
  updateEmployeeCashier(id, data){
    return http.put(`/updateEmployeeCashier/${id}`, data);
  }

  //Update Employee Restaurant Manager
  updateEmployeeRestaurantManager(id, data){
    return http.put(`/updateEmployeeRestaurantManager/${id}`, data);
  }

  //Update Employee Inventory Manager
  updateEmployeeInventoryManager(id, data){
    return http.put(`/updateEmployeeInventoryManager/${id}`, data);
  }

  //Delete Employee chef
  deleteEmployeeChefbyID(id) {
    return http.delete(`deleteEmployee/chef/${id}`);
  }
  deleteAllChefs(){
    return http.delete('deleteAllChefs');
  }

  //Delete Employee Cashier
  deleteEmployeeCashierbyID(id){
    return http.delete(`/deleteEmployee/cashier/${id}`);
  }
  deleteAllCashiers(){
    return http.delete('/deleteAllCashiers');
  }

//Delete Employee Restaurant Manager
deleteEmployeeRestaurantManagerbyID(id){
  return http.delete(`/deleteEmployee/RestaurantManager/${id}`);
}
deleteAllRestaurantManagers(){
  return http.delete(`/deleteAllRestaurantManagers`);
}
//Delete Employee Inventory Manager
deleteEmployeeInventoryManagerbyID(id){
  return http.delete(`deleteEmployee/InventoryManager/${id}`);
}
deleteAllInventoryManagers(){
  return http.delete(`deleteAllInventoryManagers`);
}
}

export default new DataService();