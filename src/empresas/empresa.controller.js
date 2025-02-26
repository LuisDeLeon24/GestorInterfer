import Empresa from "./empresa.model.js";

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
