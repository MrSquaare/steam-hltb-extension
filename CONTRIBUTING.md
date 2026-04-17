# Contributing

## Table of Contents

- [Guidelines](#guidelines)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Developing](#developing)
- [Building](#building)
- [Bundling](#bundling)
- [Testing](#testing)

## Guidelines

See [GUIDELINES.md](GUIDELINES.md) for more information.

## Getting started

### Prerequisites

1. [Install Node.js](https://nodejs.org/en/download/)
2. [Install pnpm](https://pnpm.io/installation)

### Installation

1. Clone the repository:

```shell script
git clone https://github.com/MrSquaare/steam-hltb-extension.git
cd steam-hltb-extension
```

2. Install dependencies:

```shell script
pnpm install
```

## Developing

Build, watch for changes, and reload the extension in the browser:

For Chrome:

```shell script
pnpm dev
```

For Firefox:

```shell script
pnpm dev:firefox
```

## Building

Build the extension:

For Chrome:

```shell script
pnpm build
```

For Firefox:

```shell script
pnpm build:firefox
```

## Bundling

Bundle the extension for distribution:

For Chrome:

```shell script
pnpm zip
```

For Firefox:

```shell script
pnpm zip:firefox
```

## Testing

Check the code:

```shell script
pnpm check
```

Auto-fix the code:

```shell script
pnpm check:fix
```
