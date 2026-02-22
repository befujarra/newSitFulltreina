# FullTreina - Website Institucional

Este é o repositório do site institucional da **FullTreina**, especializada em formação técnica e soluções estratégicas em **SAP PM**, **SAP Script** e **Gestão de Ativos**. O projeto foi desenhado sob o conceito _Antigravity_, proporcionando uma interface de usuário altamente imersiva, minimalista, moderna e com navegação fluida para profissionais industriais e corporativos.

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as principais tecnologias base da Web, sem a adição de bibliotecas de terceiros complexas para animações, focando sempre na performance e experiência:

- **HTML5**: Estruturação semântica e acessível (SEO otimizado).
- **CSS3 (Vanilla)**: Grid, Flexbox, Variáveis CSS, Animações e Transições avançadas.
- **JavaScript (Vanilla)**: Controle de DOM, Intersection Observer para animações de rolagem (Scroll Reveals), sistema de partículas interativas (Canvas) e submissão assíncrona do formulário.

## ✨ Funcionalidades e Características

- **Efeito Máquina de Escrever (Typewriter)**: Animação de texto interativa no topo do site (Hero Section).
- **Sistema de Partículas (Canvas)**: Backgrounds orgânicos e dinâmicos que reagem ao mouse do usuário e criam atmosferas imersivas e modernas.
- **Microinterações e Animações no Scroll**: Uso extensivo de `IntersectionObserver` para revelar seções e itens em blocos com tempo de _delay_, gerando engajamento e storytelling visual.
- **Contadores Animados (Counters)**: Numerações e dados apresentados de modo animado na seção de "Resultados/Prova Social".
- **Formulário Funcional**: Sistema de contatos que envia diretamente para o e-mail da FullTreina (`fulltreina2@gmail.com`) utilizando a API do FormSubmit.
- **Estética "Antigravity"**: Foco em espaços em branco bem definidos (Negative Space), cores fortes em alto contraste, dark mode sofisticado e leitura com rolagem envolvente.
- **Layout Responsivo**: Otimizado para funcionar perfeitamente em dispositivos móveis, tablets e monitores de mesa.

## 🗂 Estrutura do Projeto

```text
siteFulltreina/
├── index.html       # Arquivo principal de marcação e estrutura da página
├── style.css        # Folha de estilos contendo o design system e todas as regras
├── main.js          # Lógica de interatividade (Partículas, Counters, Form, etc.)
└── README.md        # Documentação do projeto (este arquivo)
```

## 🏗 Seções do Site

O layout é desenhado através do conceito de _One Page_ contendo as seguintes sessões de navegação e informação:

1. **Hero**: Capa interativa com chamada impactante e efeitos visuais.
2. **Sobre**: História e filosofia da FullTreina focada em estratégia e aplicação prática.
3. **Especialidades**: Descrição dos carros-chefes (SAP PM, SAP Script e Gestão Estratégica).
4. **Diferenciais**: Grade conceitual dos pilares da marca.
5. **Para Quem**: Destacando o público-alvo principal (Engenheiros, Técnicos e Empresas).
6. **Prova Social**: Resultados que a marca já gerou e depoimentos de terceiros.
7. **Autoridade**: Uma narrativa baseada em evidência e impacto no ecossistema industrial.
8. **Contato**: Formulário dinâmico integrado para captação de leads.

## 📬 Contato e Informações

O formulário na página envia mensagens usando a rota de backend em Javascript configurado pela API `formsubmit.co`. Ao submeter, lembre-se de que a conta vinculada no painel enviará as notificações de contatos para seus administradores de forma imediata.
