# Móveis Gonçalves

Site institucional e catálogo digital da Móveis Gonçalves, desenvolvido com
React, Next.js e TypeScript.

## Executar em localhost

Requer Node.js 22 ou mais recente.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Verificações

```bash
npm run lint
npm run build
npm test
```

## GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` publica automaticamente uma
exportação estática a cada envio para a branch `main`. A configuração usa o
subdiretório do repositório somente durante o deploy; o desenvolvimento local
continua funcionando na raiz.

Para testar a exportação do Pages localmente no PowerShell:

```powershell
$env:GITHUB_PAGES = "true"
$env:NEXT_PUBLIC_BASE_PATH = "/moveisgoncalves"
$env:NEXT_PUBLIC_SITE_URL = "https://edineifiorentini.github.io/moveisgoncalves"
npm run build:pages
```

## Conteúdo

O catálogo contém os 35 produtos e as especificações do material oficial
fornecido pela empresa. Contatos ainda não validados são apresentados sem links
acionáveis.
