import LivroModel from "../models/Livro.js";

class LivroController {
    static listarLivros = async (req, res) => {
        try {
            const meusLivros = await LivroModel.find().exec();
            res.status(200).json(meusLivros);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ocorreu um erro ao buscar os livros' });
        }
    };

    static listarLivrosPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const livro = await LivroModel.findById(id).exec();
            if (!livro) {
                res.status(404).json({ error: 'Livro não encontrado' });
            } else {
                res.status(200).json(livro);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ocorreu um erro ao buscar o livro' });
        }
    };
    

    static cadastrarLivro = async (req, res) => {
        try {
            const novoLivro = new LivroModel(req.body);
            const cadLivro = await novoLivro.save();
            res.status(201).json(cadLivro.toJSON());
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o livro' });
        }
    }

    static atualizarLivro = async (req, res) => {
        try {
            const id = req.params.id;
            await LivroModel.findByIdAndUpdate(id, {$set: req.body});
            const livroAtualizado = await LivroModel.findById(id);
            res.status(200).json(livroAtualizado);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ocorreu um erro ao atualizar o livro' });
        }
    }

    static excluirLivro = async (req, res) => {
        try {
            const id = req.params.id;
            await LivroModel.findByIdAndDelete(id);
            res.status(200).json({ message: 'Livro excluído com sucesso' });
            res.end(); // Encerra a resposta
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Não foi possível deletar o livro' });
        }
    };
}

export default LivroController;


// NÃO FUNCIONA

// import livros from "../models/Livro.js";

//class LivroController {
//    static listarLivros = (req, res) => {
//       livros.find((err, livros) => {
//            res.status(200).json(livros)
//        })
//    }
// }
// export default LivroController;