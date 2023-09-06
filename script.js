// Classe base Funcionario
class Funcionario {
    constructor(nome, idade, cargo) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
    }

    seApresentar() {
        return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e sou um(a) ${this.cargo}.`;
    }

    trabalhar() {
        return `${this.nome} está trabalhando.`;
    }
}

// Classe Gerente que herda de Funcionario
class Gerente extends Funcionario {
    constructor(nome, idade, cargo, departamento) {
        super(nome, idade, cargo);
        this.departamento = departamento;
    }

    gerenciar() {
        return `${this.nome} está gerenciando o departamento de ${this.departamento}.`;
    }
}

// Classe Desenvolvedor que herda de Funcionario
class Desenvolvedor extends Funcionario {
    constructor(nome, idade, cargo, linguagem) {
        super(nome, idade, cargo);
        this.linguagem = linguagem;
    }

    programar() {
        return `${this.nome} está programando em ${this.linguagem}.`;
    }
}

// Função para criar funcionário com validação de campos
function criarFuncionario() {
    try {
        const nome = document.getElementById('nome').value;
        const idade = parseInt(document.getElementById('idade').value);
        const cargo = document.getElementById('cargo').value;
        const gerenteCheckbox = document.getElementById('gerenteCheckbox').checked;
        const desenvolvedorCheckbox = document.getElementById('desenvolvedorCheckbox').checked;
        const departamento = document.getElementById('departamento').value;
        const linguagem = document.getElementById('linguagem').value;

        if (!nome || isNaN(idade) || !cargo) {
            throw new Error('Preencha todos os campos obrigatórios.');
        }

        if (gerenteCheckbox && desenvolvedorCheckbox) {
            throw new Error('Selecione apenas um tipo de funcionário (Gerente ou Desenvolvedor).');
        }

        if (gerenteCheckbox && !departamento) {
            throw new Error('O campo "Departamento" é obrigatório para gerentes.');
        }

        if (desenvolvedorCheckbox && !linguagem) {
            throw new Error('O campo "Linguagem" é obrigatório para desenvolvedores.');
        }

        let funcionario;
        if (gerenteCheckbox) {
            funcionario = new Gerente(nome, idade, cargo, departamento);
        } else if (desenvolvedorCheckbox) {
            funcionario = new Desenvolvedor(nome, idade, cargo, linguagem);
        } else {
            funcionario = new Funcionario(nome, idade, cargo);
        }

        const infoFuncionario = document.getElementById('infoFuncionario');
        infoFuncionario.textContent = funcionario.seApresentar() + ' ' + funcionario.trabalhar();
        if (funcionario instanceof Gerente) {
            infoFuncionario.textContent += ' ' + funcionario.gerenciar();
        } else if (funcionario instanceof Desenvolvedor) {
            infoFuncionario.textContent += ' ' + funcionario.programar();
        }

    } catch (error) {
        exibirErro(error.message);
    }
}

// Função para exibir mensagem de erro na página
function exibirErro(mensagem) {
    const infoFuncionario = document.getElementById('infoFuncionario');
    infoFuncionario.textContent = mensagem;
    infoFuncionario.style.color = 'red';
}

// Mostrar/ocultar campos de departamento e linguagem
document.getElementById('gerenteCheckbox').addEventListener('change', function () {
    const departamentoField = document.getElementById('departamentoField');
    if (this.checked) {
        departamentoField.style.display = 'block';
    } else {
        departamentoField.style.display = 'none';
    }
});

document.getElementById('desenvolvedorCheckbox').addEventListener('change', function () {
    const linguagemField = document.getElementById('linguagemField');
    if (this.checked) {
        linguagemField.style.display = 'block';
    } else {
        linguagemField.style.display = 'none';
    }
});
