import mongoose from "mongoose";

const EmpresaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    categoria: {  
        type: String,  
        required: true 
    },
    impacto: {
        type: String,
        required: [true, "La descripcion es obligatoria"]
    },
    trayectoria: {
        type: Number,
        required: [true, "Los años de trayectoria son obligatorios"]
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,  
    versionKey: false   
});

export default mongoose.model("Empresa", EmpresaSchema);