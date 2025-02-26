import Empresa from "./empresa.model.js";
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

export const saveEmpresa = async (req, res) => {
    try {
        const { name, categoria, impacto, trayectoria } = req.body;

        const empresa = new Empresa({
            name,
            categoria,
            impacto,
            trayectoria
        });

        await empresa.save(); 

        res.status(200).json({
            success: true,
            message: "Empresa agregada con éxito",
            empresa
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error al agregar la empresa",
            error
        });
    }
};

export const getEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.find();  

        res.status(200).json({
            success: true,
            empresas  
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al listar las empresas",
            error
        });
    }
};

export const getEmpresasAZ = async (req, res) => {
    try {
        const empresas = await Empresa.find().sort({ name: 1 });

        res.status(200).json({
            success: true,
            empresas
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al listar las empresas",
            error
        });
    }
};

export const getEmpresasZA = async (req, res) => {
    try {
        const empresas = await Empresa.find().sort({ name: -1 });

        res.status(200).json({
            success: true,
            empresas
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al listar las empresas",
            error
        });
    }
};

export const getEmpresas1 = async (req, res) => {
    try {
        const empresas = await Empresa.find().sort({ trayectoria: 1 });

        res.status(200).json({
            success: true,
            empresas
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al listar las empresas",
            error
        });
    }
};

export const getEmpresasC = async (req, res) => {
    try {
        const empresas = await Empresa.find().sort({ categoria: 1 });

        res.status(200).json({
            success: true,
            empresas
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al listar las empresas",
            error
        });
    }
};


export const updateEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const {...data } = req.body;

        const empresa = await Empresa.findById(id);

        if (!empresa) {
            return res.status(404).json({
                success: false,
                msg: "Empresa no encontrada"
            });
        }

        Object.assign(empresa, data);

        await empresa.save();

        res.status(200).json({
            success: true,
            msg: "Empresa Actualizada!",
            empresa
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error al actualizar la empresa",
            error
        });
    }
};

export const getEmpresasXLSX = async (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const empresas = await Empresa.find();
 
        if (empresas.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No hay empresas para generar el archivo Excel."
            });
        }
    
        const wb = XLSX.utils.book_new();

        const empresasData = empresas.map(empresa => ({
            Nombre: empresa.name,  
            Categoria: empresa.categoria,
            Impacto: empresa.impacto,
            Trayectoria: empresa.trayectoria,
            Status: empresa.status ? "Activo" : "Inactivo"  
        }));

        const ws = XLSX.utils.json_to_sheet(empresasData);

        XLSX.utils.book_append_sheet(wb, ws, "Empresas");

        const fileBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

        const folderPath = path.join(path.dirname(path.dirname(__dirname)), 'ReportesExcel');

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        const filePath = path.join(folderPath, 'empresas.xlsx');
        console.log('Ruta del archivo:', filePath);

        

        fs.writeFileSync(filePath, fileBuffer);

        res.status(200).json({
            success: true,
            message: "Archivo Excel generado y guardado con éxito.",
            filePath 
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al generar el archivo Excel",
            error
        });
    }
};