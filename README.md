# Listification

Listification est une PWA qui explore la manière de construire des application ambidextre.
L'objectif est de construire un service de conception de liste qui fonctionne complètement hors ligne, qui utilise 
indexedDb et qui propose une interface inversable pour gaucher ou droitier.

L'application est proposé dans une version fonctionnelle, mais elle est toujours en développement.

Plusieurs fonctionnalité restent encore à être développées, comme par exemple le partage de liste, le fonctionnement 100% hors ligne,
le choix du thème de couleur, le drag-and-drop pour changer l'ordre des items dans une liste ...

## Contribution

Si vous avez envie de contribuer au projet, n'hésitez pas à choisir ou ouvrir une issue et proposer une pull request.  Il y a pas mal de petites 
modifications et améliorations à apporter et des issues seront créées régulièrement en espérant que des personnes se joignent à moi dans ce petit projet.

## Pour contribuer:
<ol>
    <li>forkez ce repo</li>
    <li>créer une copie locale de votre fork.</li>
    <li>choisir une issue (ou en créer une) et créer une branche locale pour commencer à travailler</li>
    <li>Push les modification sur une branche du même nom sur votre fork</li>
    <li>Ouvrir une pull request pour proposer les changements</li>
</ol>

## Contact
Vous pouvez me contacter sur 

<ul>
    <li><a href="https://www.linkedin.com/in/eric-podhorecki-8946aa1ba/">Linkedin</a></li>
    <li><a href="https://discord.com/channels/1222094066284499034/1222094595182034986">Le serveur Discord de Six Lits Cône Valet </a></li>
</ul>

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
