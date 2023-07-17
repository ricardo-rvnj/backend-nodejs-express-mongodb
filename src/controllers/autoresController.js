import AutoresModel from "../models/Autor.js";

class AutoresController {
    static listarAutores = async (req, res) => {
        try {
            const meusAutores = await AutoresModel.find().exec();
            res.status(200).json(meusAutores);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ocorreu um erro ao buscar os autores' });
        }
    };

    static listarAutoresPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const autor = await AutoresModel.findById(id).exec();
            if (!autor) {
                res.status(404).json({ error: 'Autor não encontrado' });
            } else {
                res.status(200).json(autor);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ocorreu um erro ao buscar o autor' });
        }
    };
    

    static cadastrarAutor = async (req, res) => {
        try {
            const novoAutor = new AutoresModel(req.body);
            const cadAutor = await novoAutor.save();
            res.status(201).json(cadAutor.toJSON());
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o autor' });
        }
    }

    static atualizarAutor = async (req, res) => {
        try {
            const id = req.params.id;
            await AutoresModel.findByIdAndUpdate(id, {$set: req.body});
            const autorAtualizado = await AutoresModel.findById(id);
            res.status(200).json(autorAtualizado);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ocorreu um erro ao atualizar o autor' });
        }
    }

    static excluirAutor = async (req, res) => {
        try {
            const id = req.params.id;
            await AutoresModel.findByIdAndDelete(id);
            res.status(200).json({ message: 'Autor excluído com sucesso' });
            res.end(); // Encerra a resposta
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Não foi possível deletar o autor' });
        }
    };
    
    

}

export default AutoresController;