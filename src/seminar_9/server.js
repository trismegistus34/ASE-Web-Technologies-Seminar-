import express from 'express';
import sequelize from './sequelize.js'
import Employee from './models/employee.js';
import router from './routes/employees.js';

const app = express();

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.set("port", process.env.PORT || 7000);

app.use("/api", router);

app.use((err, req, res, next) => {
    res.status(500).json({ error: "Something broke!" });
});

app.listen(app.get("port"), async () => {
    console.log(`Server started on http://localhost:${app.get("port")}`);
    try 
    {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch(err)
    {
        console.error("Unable to connect to database: ", error);
    }
});