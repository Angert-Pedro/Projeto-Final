export default function validateRegister({
    nome,
    username,
    email,
    celular,
    cpf,
    senha,
    confirmarSenha,
    isChecked,
}: {
    nome: string;
    username: string;
    email: string;
    celular: string;
    cpf: string;
    senha: string;
    confirmarSenha: string;
    isChecked: boolean;
}): string | null {
    if (!nome.trim() || !username.trim() || !email.trim() || !celular.trim() || !senha || !confirmarSenha) {
        return "Preencha todos os campos.";
    }

    if (senha !== confirmarSenha) {
        return "As senhas não coincidem.";
    }

    if (!isChecked) {
        return "Você precisa aceitar os termos e condições.";
    }

    if (!validateCPF(cpf)) {
        return "CPF inválido.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "E-mail inválido.";
    }

    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!senhaRegex.test(senha)) {
        return "A senha deve ter ao menos 8 caracteres, incluindo letra maiúscula, minúscula e caractere especial.";
    }

    return null;
}


function validateCPF(cpf: string): boolean {
    const clean = cpf.replace(/\D/g, "");

    if (clean.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(clean)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(clean[i - 1]) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(clean[9])) return false;

    sum = 0;

    for (let i = 1; i <= 10; i++) {
        sum += parseInt(clean[i - 1]) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(clean[10])) return false;

    return true;
}
