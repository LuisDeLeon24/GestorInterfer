import { Router } from "express";
import { check } from "express-validator";
import {saveEmpresa,getEmpresas,updateEmpresa,getEmpresasAZ,getEmpresasZA,getEmpresas1,getEmpresasC,getEmpresasXLSX} from "./empresa.controller.js";
import {validarCampos} from "../middlewares/validar-campos.js";
import {validarJWT} from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/guardarEmpresa",
    [
        validarJWT,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("categoria", "La categoría es obligatoria").not().isEmpty(),
        check("impacto", "La descripcion es obligatoria").not().isEmpty(),
        check("trayectoria", "La trayectoria es obligatoria").not().isEmpty(),
        validarCampos
    ],
    saveEmpresa
)

router.get(
    "/listarEmpresas",
     getEmpresas
)

router.get(
    "/listarEmpresasAZ",
     getEmpresasAZ
)

router.get(
    "/listarEmpresasZA",
    getEmpresasZA
)

router.get(
    "/listarEmpresas1",
    getEmpresas1
)

router.get(
    "/listarEmpresasC",
    getEmpresasC
)

router.get(
    "/listarEmpresasXLSX",
    getEmpresasXLSX
)

router.put(
    "/actualizarEmpresa/:id",
    [
        validarJWT,
        check("id", "No Es Un ID Valido").isMongoId(),
        validarCampos
    ],
    updateEmpresa
)

export default router;