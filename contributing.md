# Contributing

First and foremost, thank you! We appreciate that you want to contribute to icon-shelf, your time is valuable, and your contributions mean a lot to us.

## Issues

Do not create issues about bumping dependencies unless a bug has been identified, and you can demonstrate that it effects this library.

**Help us to help you**

Remember that we’re here to help, but not to make guesses about what you need help with:

- Whatever bug or issue you're experiencing, assume that it will not be as obvious to the maintainers as it is to you.
- Spell it out completely. Keep in mind that maintainers need to think about _all potential use cases_ of a library. It's important that you explain how you're using a library so that maintainers can make that connection and solve the issue.

_It can't be understated how frustrating and draining it can be to maintainers to have to ask clarifying questions on the most basic things, before it's even possible to start debugging. Please try to make the best use of everyone's time involved, including yourself, by providing this information up front._

## Repo Setup

> _Note_ that this repository is compatible with GitHub Codespaces as well as VS Code Remote Containers. Opening your cloned project with either of these options will perform these dev setup steps for you automatically! [demo](https://vimeo.com/757666222)

The package manager used to install and link dependencies must be npm v7 or later.

> Make sure you have Node version 16.x installed!

1. Create a `fork` of the main repository into your own Github account
2. Clone your forked repository
3. `cd` into the directory of the repository (eg. `cd icon-shelf`)
4. Run `npm install` to install dependencies for the project
5. `npm run watch` start electron app in watch mode.
6. `npm run compile` build app but for local debugging only.
7. `npm run lint` lint your code.
8. `npm run typecheck` Run typescript check.
9. `npm run test` Run app test.
