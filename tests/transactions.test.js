// const {jwt} = require ('../middlewares')
// const supertest = require('supertest');
// const app = require('../app');
// const api = supertest(app);
// const db = require('../database/models');
// const { Transaction } = require('../database/models');
// const {userService}=require('../services')

// let mockAdmin

// beforeAll(async () => {
//   db.sequelize.sync({ logging: false });

//   mockAdmin= await userService
// });

// // const mockAdmin = {
// //     id:1,
// //     firstName: 'administrator',
// //     lastName: 'administrator',
// //     email: 'mockAdmin@admin.com',
// //     password: '12345678',
// //     roleId: 1,
// // };

// const mockUser = {
//     id:2,
//     firstName: 'User',
//     lastName: 'Updated',
//     email: 'userupdated@test.com',
//     password: '12345678',
//     roleId: 2,
// };

// const transaction = {
//     category: 1,
//     amount: 204,
//     date: "2022-05-05"
// };

// const tokenAdmi= `Bearer ${jwt.encode(mockAdmin)}`
// const tokenDecoAdmi=jwt.decode(tokenAdmi)

// const tokenUser= `Bearer ${jwt.encode(mockUser)}`
// const tokenDecoUser=jwt.decode(tokenUser)

// describe('POST Transactions', () =>{

//     it('crear transaccion', async()=>{

//         const { body, status } = await api.post('/transactions').set({ Authorization: tokenAdmi} ).send(transaction)

//         console.log("linea 56", body)

//         expect(status).toBe(200);
//         expect(body.message).toContain('Transactions retrieved successfully');
//     })

// })

// describe('GET Transactions', () =>{

// 	it('traer todas las transacciones', async()=>{

// 	 const { body, status } = await api.get('/transactions').set({ Authorization: tokenAdmi });

// 	expect(status).toBe(200);
// 	expect(body.message).toContain('Transactions retrieved successfully');
// 	})

// })

// afterAll(async () => {
//   db.sequelize.close();
// });
