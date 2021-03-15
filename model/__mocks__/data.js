const contacts = [
    {
        features: [],
        _id: "604bd9f094c2512ffc57e335",
        name: "test3233",
        email: "test23233@test.com",
        phone: "12345678923",
        owner: {
            subscription: "free",
            email: "test22@test.com"
        },
        createdAt: "2021-03-12T21:15:28.619Z",
        updatedAt: "2021-03-12T21:15:28.619Z"
    },
    {
        features: [],
        _id: "604bd9f894c2512ffc57e336",
        name: "test345",
        email: "test23553@test.com",
        phone: "12345678923",
        owner: {
            subscription: "free",
            email: "test22@test.com"
        },
        createdAt: "2021-03-12T21:15:36.116Z",
        updatedAt: "2021-03-12T21:15:36.116Z"
    }
  ]
  
  const newContact = {
    name:"test3235",
    email:"test23235@test.com",
    phone:"12345678923"
  }
  
  const Auth = {
    subscription: 'free',
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNGEwZmMzYTdmMWI4MDFiNGVhODk4NSIsImlhdCI6MTYxNTYzMDcxOCwiZXhwIjoxNjE1NjM3OTE4fQ.kdl3_jfehnTrURj47lkcq39CkPzvdpXGSKv5JFZjrxs',
    idImg: null,
    _id: '604a0fc3a7f1b801b4ea8985',
    email: 'test22@test.com',
    password: '$2b$08$xjNwZF2kt5MeKpGc9wg3z.Hwr4szN1AFMwlUfR/IUnssnGgRxx83K',
    updatedAt: '2021-03-11T12:40:35.211Z',
    avatar:'604a0fc3a7f1b801b4ea8985\\1615489749986-Screenshot_1.png',
   }
  
  const auths = []
  auths[0] = Auth
  
  const newAuth = { email: 'newtest@test.com', password: '123456' }
  
  module.exports = { contacts, newContact, Auth, auths, newAuth }