'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import { hash } from "argon2";
import authRoutes from '../src/auth/auth.routes.js'
import empresaRoutes from '../src/empresas/empresa.routes.js'
import limiter from '../src/middlewares/validar-cant-peticiones.js'
import Usuario from "../src/user/user.model.js";
import Role from "../src/role/role.model.js";

const configurarMiddlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}
const configurarRutas = (app) =>{   
    app.use("/gestorInterfer/auth", authRoutes);
    app.use("/gestorInterfer/empresas", empresaRoutes);
}

const initializeRoles = async () => {
    try {
        const defaultRole = await Role.findOne({ role: "ADMIN_ROLE" });
        if (!defaultRole) {
            await Role.create({ role: "ADMIN_ROLE" });
            console.log("Rol por defecto creado: ADMIN_ROLE");
        } else {
            console.log("Rol por defecto ya existente");
        }
    } catch (error) {
        console.error("Error al inicializar el rol:", error);
    }
};

const crearAdmin = async () => {
    try {
        const adminExistente = await Usuario.findOne({ role: "ADMIN_ROLE" });

        if (!adminExistente) {
            const passwordEncriptada = await hash("SumoAdmin");

            const admin = new Usuario({
                name: "Admin",
                surname: "Admin",
                username: "admin",
                email: "admin@gmail.com",
                phone: "12345",
                password: passwordEncriptada,
                role: "ADMIN_ROLE"
            });

            await admin.save();
            console.log("Administrador creado exitosamente.");
        } else {
            console.log("El administrador ya existe.");
        }
    } catch (error) {
        console.error("Error al crear el administrador:", error);
    }
};

const conectarDB = async () => {
    try {
        await dbConnection();
        console.log("Conexion Exitosa Con La Base De Datos");
        await initializeRoles();
    } catch (error) {
        console.log("Error Al Conectar Con La Base De Datos", error);
    }
}

export const iniciarServidor = async () => {
    const app = express();
    const port = process.env.PORT || 3000;

    await conectarDB();
    await crearAdmin();
    configurarMiddlewares(app);
    configurarRutas(app);

    app.listen(port, () => {
        console.log(`Server Running On Port ${port}`);
    });
}