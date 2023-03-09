const connection = require("./connection");

const getAllCustomers = async () =>{
    const [costumers] = await connection.execute("SELECT * FROM cliente");
    return costumers;
};

module.exports = {
    getAllCustomers
}