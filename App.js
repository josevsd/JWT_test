const express = require('express');
const app = express('')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const { eAdmin } = require('./middlewares/auth')

app.use(express.json())


app.get('/', eAdmin,  async (req, res) =>{
    
    return res.json({
        erro: false, 
        mensagem: "listar usuário",
        id_usuario_logado: req.userId
    })
})

app.post('/cadastrar', async(req, res) =>{
    const password = await bcrypt.hash("123456", 8)

    console.log(password);

    return res.json({
        erro: false,
        mensagem: "cadastrar usuário"
    })
})

app.post('/login', async (req, res)=>{
    console.log(req.body);

    if(req.body.email != "keila@gmail.com"){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta! E-mail incorreto"
        }
        );
    }

    var token = jwt.sign({id: 1}, "D4G5K6K7P9D5G6H7J8K9",{
        expiresIn: '7d'
    })

    if(!(await bcrypt.compare(req.body.password, "$2b$08$tkD5ErHsHaeHpuWowiDtc.yeQG5qq3te4.zgDmIrQfLpT3DO9lNoK"))){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta! E-mail incorreto"
        }
        );
    }

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token: token
    })
})

app.listen(8080, () =>{
    console.log("Servidor http://localhost:8080 ")
})