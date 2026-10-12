import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();

app.use(cors({
    origin: 'https://finnaly-mannage-app.vercel.app'
}));
app.use(express.json());

// Identifica a collection correspondente ao mês atual.

// Rota para consultar um usuário pela matrícula.
app.put("/read", async (req, res) => {
    try {
        const matricula = req.body.matricula
        const mes = req.body.mes

        // Valida a matrícula recebida.
        if (
            matricula === undefined ||
            matricula === null ||
            String(matricula).trim() === ""
        ) {
            return res.status(400).json({
                message: "Informe uma matrícula válida."
            });
        }

        // Obtém a collection do mês atual.
        const collection = db.collection(mes)

        // Procura o usuário pela matrícula.
        const usuario = await collection.findOne({
            matricula: String(matricula).trim()
        });

        // Caso a matrícula não exista.
        if (!usuario) {
            return res.status(404).json({
                message: "Usuário não encontrado."
            });
        }

        // Retorna os dados encontrados.
        return res.status(200).json({dados:usuario});

    } catch (error) {
        console.error("Erro ao consultar usuário:", error);

        return res.status(500).json({
            message: "Erro interno ao consultar usuário."
        });
    }
});

// Rota básica para verificar se o servidor está funcionando.
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Servidor funcionando!"
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});