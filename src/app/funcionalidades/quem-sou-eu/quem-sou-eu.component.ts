import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CommonModule } from '@angular/common';
import ScrollSmoother from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

@Component({
  selector: 'app-quem-sou-eu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quem-sou-eu.component.html',
  styleUrls: ['./quem-sou-eu.component.scss']
})
export class QuemSouEuComponent implements AfterViewInit {

  ngAfterViewInit(): void {
  const smoother = ScrollSmoother.create({
    smooth: 1.5,
    effects: true,
    smoothTouch: 0.1
  });

  gsap.utils.toArray('[data-section], [data-animate]').forEach((el: any) => {
    const direction = el.getAttribute('data-animate');
    const y = direction === 'fade-up' ? 80 : 0;
    const x = direction === 'fade-left' ? -80 : direction === 'fade-right' ? 80 : 0;

    gsap.from(el, {
      opacity: 0,
      y,
      x,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });
  });
}

empresas = [
  {
    nome: 'Stefanini IT Solutions',
    logo: 'assets/quem-sou-eu/logo-stefanini.png',
    ramo: 'Consultoria em TI e Transformação Digital',
    periodo: 'Jan/2020 - Dez/2020',
   },
  {
    nome: 'Reply',
    logo: 'assets/quem-sou-eu/logo-reply.png',
    ramo: 'Serviços de TI e Transformação Digital (Multinacional)',
    periodo: 'Jan/2021 - Ago/2021',
  },
  {
    nome: 'Bematize',
    logo: 'assets/quem-sou-eu/logo-bematize.png',
    ramo: 'Gestão de benefícios corporativos',
    periodo: 'Mai/2022 - Nov/2022',
  },
  {
    nome: 'Lojão do Brás',
    logo: 'assets/quem-sou-eu/logo-lojao.png',
    ramo: 'Varejo e Soluções Internas de TI',
    periodo: 'Dez/2022 - Atual',
  }
];


  clientes = [
    { empresa: 'Stefanini', nomes: ['Zurich Seguros'] },
    { empresa: 'Reply', nomes: ['Berkley Seguros', 'Zurich Seguros'] },
    {
      empresa: 'Bematize',
      nomes: ['iFood', 'Metlife', 'Amil', 'Grupo Boticário', 'Deloitte', 'Gerdau', 'EDP', 'Cogna', 'Novartis', 'MCassab', 'Unither']
    },
    { empresa: 'Lojão do Brás', nomes: ['Todas as empresas do grupo'] }
  ];

  tecnologias = [
    {
      nome: 'Frontend',
      itens: [
        { nome: 'HTML5', icone: 'devicon-html5-plain colored' },
        { nome: 'CSS3', icone: 'devicon-css3-plain colored' },
        { nome: 'SCSS', icone: 'devicon-sass-original colored' },
        { nome: 'JavaScript', icone: 'devicon-javascript-plain colored' },
        { nome: 'TypeScript', icone: 'devicon-typescript-plain colored' },
        { nome: 'jQuery', icone: 'devicon-jquery-plain colored' },
        { nome: 'Angular', icone: 'devicon-angularjs-plain colored' },
        { nome: 'React', icone: 'devicon-react-original colored' },
        { nome: 'Bootstrap', icone: 'devicon-bootstrap-plain colored' },
        { nome: 'Tailwind CSS', icone: 'devicon-tailwindcss-plain colored' },
        { nome: 'Material UI', icone: 'devicon-materialui-plain colored' },
        { nome: 'WebSockets', icone: 'devicon-socketio-original colored' }
      ]
    },
    {
      nome: 'Backend',
      itens: [
        { nome: '.NET Core', icone: 'devicon-dotnetcore-plain colored' },
        { nome: 'Blazor', icone: 'devicon-dotnetcore-plain colored' },
        { nome: 'REST API', icone: 'devicon-dotnetcore-plain colored' },
        { nome: 'GraphQL', icone: 'devicon-graphql-plain colored' },
        { nome: 'gRPC', icone: 'devicon-go-original colored' },
        { nome: 'MediatR', icone: 'devicon-csharp-plain colored' }
      ]
    },
    {
      nome: 'Banco de Dados',
      itens: [
        { nome: 'SQL Server', icone: 'devicon-microsoftsqlserver-plain colored' },
        { nome: 'PostgreSQL', icone: 'devicon-postgresql-plain colored' },
        { nome: 'MySQL', icone: 'devicon-mysql-plain colored' },
        { nome: 'Oracle', icone: 'devicon-oracle-original colored' },
        { nome: 'SQLite', icone: 'devicon-sqlite-plain colored' },
        { nome: 'Redis', icone: 'devicon-redis-plain colored' },
        { nome: 'Firebase', icone: 'devicon-firebase-plain colored' }
      ]
    },
    {
      nome: 'DevOps & Ferramentas',
      itens: [
        { nome: 'Git', icone: 'devicon-git-plain colored' },
        { nome: 'GitHub', icone: 'devicon-github-original colored' },
        { nome: 'GitLab', icone: 'devicon-gitlab-plain colored' },
        { nome: 'Azure DevOps', icone: 'devicon-azure-plain colored' },
        { nome: 'Postman', icone: 'devicon-postman-plain colored' },
        { nome: 'Swagger', icone: 'devicon-swagger-plain colored' },
        { nome: 'Visual Studio', icone: 'devicon-visualstudio-plain colored' },
        { nome: 'VS Code', icone: 'devicon-vscode-plain colored' }
      ]
    },
    {
      nome: 'Testes',
      itens: [
        { nome: 'xUnit', icone: 'devicon-csharp-plain colored' },
        { nome: 'Moq', icone: 'devicon-csharp-plain colored' },
        { nome: 'Selenium', icone: 'devicon-selenium-original colored' }
      ]
    },
    {
      nome: 'Metodologias',
      itens: [
        { nome: 'Scrum', icone: 'devicon-scrum-original colored' },
        { nome: 'Kanban', icone: 'devicon-trello-plain colored' },
        { nome: 'Agile', icone: 'devicon-agile-original colored' }
      ]
    }
  ];

  diferenciais = [
    'Experiência com sistemas de missão crítica e alta disponibilidade',
    'Facilidade de comunicação entre áreas técnicas e de negócio',
    'Comprometimento com clean code, performance e segurança',
    'Capacidade de liderar projetos end-to-end'
  ];

  impactos = [
    'Redução de até 40% no tempo de resposta de APIs críticas',
    'Modernização de sistemas legados com ganhos reais de performance',
    'Participação em projetos com mais de 1 milhão de usuários'
  ];

  cursos = [
    'Rocketseat Ignite (React & .NET)',
    'Udemy – .NET Avançado, Clean Architecture, Angular Avançado',
    'Alura – CQRS, TDD, DDD, DevOps na prática'
  ];

  comunidade = [
    'Mentoria para desenvolvedores iniciantes',
    'Contribuições em fóruns como Stack Overflow e GitHub',
    'Participação em eventos técnicos e meetups de desenvolvimento'
  ];

  idiomas = [
    'Inglês — Intermediário',
    'Espanhol — Intermediário'
  ];
}
