"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
// crear esquema
const Schema = mongoose_1.default.Schema;
const WorkerUserSchema = new Schema({
    // idCreador: { type: mongoose.Types.ObjectId, ref: "userWorker" },
    nombre: { type: String, default: "Colaborador" },
    apellido: { type: String },
    identificacion: { type: String },
    telefono: { type: String },
    correo: {
        type: String,
        lowercase: true,
        required: [true, "Debe ingresar un correo"],
        unique: true,
    },
    password: { type: String },
    fecha_alta: { type: String },
    fecha_login: { type: String },
    role: { type: mongoose_1.default.Types.ObjectId, ref: "roleColaborador" },
    cantVisitas: { type: Number, default: 0 },
    estado: { type: Boolean, default: true },
    sucursal: { type: mongoose_1.default.Types.ObjectId, ref: "sucursales" },
});
// validacion para único elemento
WorkerUserSchema.plugin(mongoose_unique_validator_1.default, { message: "{PATH}, ya existe!!" });
module.exports = mongoose_1.default.model("userWorker", WorkerUserSchema);
