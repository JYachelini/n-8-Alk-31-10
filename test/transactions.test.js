// //const { Transaction } = require('../database/models');
// const {jwt} = require ('../middlewares')

// const supertest = require('supertest');
// const app = require('../app');
// const api = supertest(app);

// const mockAdmin = {
//     firstName: 'administrator',
//     lastName: 'administrator',
//     email: 'mockAdmin@admin.com',
//     password: '12345678',
//     roleId: 1,
// };

// const mockUser = {
//     firstName: 'user',
//     lastName: 'user',
//     email: 'mockUser@admin.com',
//     password: '12345678',
//     roleId: 2,
// };

// const tokenAdmi= `Bearer ${jwt.encode(mockAdmin)}`
// //const tokenDecoAdmi=jwt.decode(tokenAdmi)

// const tokenUser= `Bearer ${jwt.encode(mockUser)}`
// //const tokenDecoUser=jwt.decode(tokenUser)

// // describe('GET Transactions', () =>{

// // 	//it('traer todas las transacciones', async()=>{

// // 	 const { body } = await api.get('/transactions').set({ Authorization: tokenAdmi });

// // 	// expect(body.code).toContain(200);
// // 	// expect(body.message).toContain('Users retrieved successfully');
// // 	//})

// // })
