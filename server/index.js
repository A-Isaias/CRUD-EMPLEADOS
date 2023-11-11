const express = require ("express");
const app = express();
const mysql=require("mysql");
const cors = require ("cors");

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",   
    user: "root",
    password : "123456789",
    database :"empleados_crud"
});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const antiguedad = req.body.antiguedad;

    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,antiguedad) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,antiguedad],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send('Registro Exitoso');
        }
    }
    );
});

app.get("/empleados",(req,res)=>{
    db.query('SELECT * FROM empleados',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.put("/update",(req,res)=>{
    const id = req.body.id; 
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const antiguedad = req.body.antiguedad;

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,antiguedad=? WHERE id=?',[nombre,edad,pais,cargo,antiguedad,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send('Registro Actualizado');
        }
    }
    );
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id; 
    
    db.query('DELETE FROM empleados WHERE id=?',[id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send('Registro ELIMINADO con éxito');
        }
    }
    );
});


app.listen(3001,()=>{
    console.log("app corriendo en puerto 3001");
})