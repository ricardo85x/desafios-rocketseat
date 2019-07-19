export default {
    passos: [
        {
            name: 'instalar eslint',
            desc: 'yarn add eslint',
        },
        {
            name: 'iniciar o eslint',
            desc: 'yarn eslint --init',
        },
        {
            name: 'apagar arquivo package-lock.json e rodar yarn',
        },
        {
            nome: 'configurar editorconfig',
            desc:
                'extensao do editorconfig no vscode para configurar eslint prettier',
        },
        {
            nome: 'instalar prettieer e eslint',
            desc:
                'yarn add prettier eslint-config-prettier eslint-plugin-prettier  babel-eslint',
        },
        {
            nome: 'configurar rotas',
            desc: [
                {
                    name: 'instalar modulo react-router-dom',
                },
            ],
        },
    ],
};
