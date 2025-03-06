# Copilot Instructions

## General Guidelines

- Always use TypeScript instead of JavaScript.
- Follow SOLID principles and Clean Code best practices.
- Keep code simple and readable (KISS principle).
- Avoid redundant code by following DRY principles.
- Do not implement features that are not requested (YAGNI principle).
- All responses must be in Spanish, but the code should always be written in English.

## Frontend Guidelines

- React v19 and functional components.
- Use shadcn/ui as the primary styling solution. If necessary, complement it with Tailwind CSS, avoiding traditional CSS.
- Use ReactRouter v7 for routing system.
- Use TanStack Query v5 for fetching data together with fetch.
- Use Socket.IO for real-time communication via WebSockets.
- Manage global state using Zustand.
- Follow the Atomic Design methodology, organizing components into atoms, molecules, organisms, and templates.
- All Atomic Design components must be placed inside the `components` folder.
- Atom files must follow the naming convention `[name].atom.tsx` and be encapsulated in a folder with the same name as the component.
- Molecule files must follow the naming convention `[name].molecule.tsx` and be encapsulated in a folder with the same name as the component.
- Organism files must follow the naming convention `[name].organism.tsx` and be encapsulated in a folder with the same name as the component.
- Template files must follow the naming convention `[name].template.tsx` and be encapsulated in a folder with the same name as the component.
- Each component must have its own independent styles file separate from the main component file.
- The styles file for each component must follow the naming convention `[name].style.css`.
- Every css file must include `@import "tailwind";` in its first line.
- Always use Tailwind CSS for styling and avoid writing custom CSS unless necessary.
- Tailwind utility classes should be applied within the styles file using `@apply`.
- All frontend file names must be in lowercase.
- The variable name of each component function must include a suffix to indicate its type in Atomic Design:
  - Atoms: `ButtonAtom`, `InputAtom`.
  - Molecules: `SearchBarMolecule`, `CardMolecule`.
  - Organisms: `HeaderOrganism`, `FooterOrganism`.
  - Templates: `HomeTemplate`, `DashboardTemplate`.
  - Pages: `HomePage`, `DashboardPage`.

## Unit test instructions

- Do unit tests only if explicitly requested.
- Unit tests are performed with Jest and React Testing Library.
- Unit tests always with the AAA pattern.
- In unit tests, comparison variables in the Assert section should always be defined separately from the variables in the Act section. In other words, they should always be defined in the Arrange section.
- In unit tests, expected variables should not be used in the Act section.
- Ensure that each test case describes what it verifies clearly.
- Always test the happy path.
- Always test the unhappy path.

## Security Considerations

- Do not generate hardcoded credentials or API keys.
- Use environment variables for configuration settings.
