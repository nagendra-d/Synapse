# Synapse - React Chat Application

## Running the app in dev:

- Do a yarn install:

```
yarn
```

- Start the app for the platform you want to test on

```
yarn start:android
yarn start:ios
```

- Pack the app

```
yarn pack:android
yarn pack:ios
```

## Guidelines:

### Do not

- Commit directly to master.
- Create branches with multiple features/pull requests.
- Disable lint rules and typescript features.
- Avoid the `any` type unless it's REALLY necessary.
- Let pull requests get too big. Break down scope if necessary.
- Package the app for the store with code that ISN'T on master.

### Do

- Follow best practices of the typescript language.
- Write types for everything.
- Create one branch per feature.
- Merge master into your branch in case it's behind master.
- Create pull requests so the features/bug fixes can be reviewed before merged into master.
- Review each other's code, code cannot be merged to master unless reviewed.
- Any code to master should be ready for release.
- keep feature branches short lived.
- Run lint before creating PRs to make sure the code follow guildelines.

## Motivations for the Guildelines:

- We can build scalable, consistent, readable code and with fewer bugs.
- Keep moving fast even when the code-base is growing.
- We can become a strong development team with high quality practices.
