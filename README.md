# Eventsuffle API

> HTTP API to help schedule events with friends. For a pre-interview exercise.

## Requirements

- API contract provided [here](https://gist.github.com/VilluNikolaiV/44eae2829f7ece9c0d0657d502ed8c63)
- Short development time (~2 hours)
- Easily maintainable and scalable
- Tests
- README with instructions for usage

## Plan

- Application written in [TypeScript](https://www.typescriptlang.org/) using [Bun](https://bun.sh/), [Elysia](https://elysiajs.com/) and [Prisma](https://www.prisma.io/)
  - This stack offers built-in full type-safety from the API to the database, minimizing the time spent debugging and enhances maintainability\*
    - Bun offers built-in TypeScript support, bundler, test runner and many more libraries that would have to be installed and setup separately when using [Node.js](https://nodejs.org/en), the most popular alternative
    - Elysia is a backend web framework built specifically for Bun and offers full type-safety with its a built-in parameter validator
    - Prisma is an [ORM](https://www.freecodecamp.org/news/what-is-an-orm-the-meaning-of-object-relational-mapping-database-tools/) that supports TypeScript and requires very little setup

  - Using an ORM to automatically apply some optimizations like [connection pooling](https://www.cockroachlabs.com/blog/what-is-connection-pooling/) and protection against threats like [SQL injection](https://www.w3schools.com/sql/sql_injection.asp). Managing the database schema with Prisma can be more maintainable as the project scales.
  - Some alternatives
    - [C#](https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/overview)
      - Better performance under load, more resource efficient and offers [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) for more advanced database operations and data processing\*
    - [Go](https://go.dev/)
      - Even better performance and resource efficiency, but not as advanced tools for database operations. The most popular ORM, [GORM](https://gorm.io/index.html), is not as feature-rich, as it's not type-safe as is.\*

- Using [PostgreSQL](https://www.postgresql.org/) as the database, as it's feature-rich, open-source and allows the application to be [horizontally scaled](https://www.cockroachlabs.com/blog/vertical-scaling-vs-horizontal-scaling/), by removing state from the application file-system.
  - A strong alternative that would make sense for this project would be [SQLite](https://www.sqlite.org/), which would create a database file in the application's local file-system
  - Wouldn't have to set up a completely separate database instance
  - Since the state would be stored locally in the application image, horizontal scaling, as in running multiple instances of the server at the same time to enhance availability, would be off the table
  - This choice could be considered as premature optimization, **but** room for scalability was an explicit requirement

- Using [ESLint](https://eslint.org/) for enforcing popular coding styles
- Creating API tests with Bun's and Elysia's testing tools to enforce the API schema
- Using a service layer to separate the API from the business logic
- Using a [GitHub Actions](https://github.com/features/actions) workflow for CI
  - Verifying that the linter, build and tests pass
  - Tagging each main branch commit with a semantic version and publishing a Docker image from it
- Deploying the application to my own hosting environment

\* Based on findings from my thesis: [A comparative analysis of modern programming languages in REST API development](https://www.theseus.fi/handle/10024/884660)
