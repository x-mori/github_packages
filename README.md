# Developer utility packages

One repository with separately published developer utilities. The table records the current counts for four registries. Containers are outside this collection.

| Registry | Packages | Runtime |
| --- | ---: | --- |
| Apache Maven | 18 | Java 17+ |
| npm | 18 | Node.js 20+ |
| NuGet | 9 | .NET 8 |
| RubyGems | 7 | Ruby 3.1+ |

## Package index

| Registry | Package names |
| --- | --- |
| Maven | `initials-from-name`, `mask-string`, `human-file-size`, `human-duration`, `relative-time-lite`, `date-range`, `business-days`, `age-from-date`, `random-id-lite`, `secure-pin`, `otp-generator-lite`, `random-string-secure`, `password-strength-lite`, `email-normalizer`, `url-normalizer-lite`, `strip-tracking-params`, `query-string-object`, `join-url` |
| npm | `env-required`, `safe-json-parse`, `retry-async`, `sleep-promise`, `timeout-promise`, `array-chunk`, `array-unique-by`, `group-by-key`, `object-pick`, `object-omit`, `deep-freeze`, `deep-merge-lite`, `remove-empty-values`, `flatten-object`, `unflatten-object`, `safe-get`, `string-truncate-smart`, `slugify-lite` |
| NuGet | `XMori.IsPrivateIp`, `XMori.FetchTimeout`, `XMori.FetchRetry`, `XMori.FetchJsonSafe`, `XMori.ApiErrorNormalizer`, `XMori.RateLimitMemory`, `XMori.DebouncePromise`, `XMori.AsyncQueueLite`, `XMori.MemoizeAsync` |
| RubyGems | `x-mori-once-async`, `x-mori-console-prefix`, `x-mori-redact-secrets`, `x-mori-package-version`, `x-mori-git-repo-info`, `xmori-copy-to-clipboard-cli`, `x-mori-port-check` |

Each directory under `packages/` has its own package manifest, source, test, and README. Packages have no runtime dependencies. npm packages include TypeScript declarations. The Maven root `pom.xml` only aggregates modules; it is not a nineteenth package.

## Check the repository

```sh
node scripts/check-inventory.mjs
pnpm install --frozen-lockfile
pnpm test:npm
mvn test
dotnet run --project tests/nuget-smoke/NugetSmoke.csproj -c Release
for dir in packages/rubygems/*; do (cd "$dir" && ruby -Ilib test/test.rb); done
```

The GitHub Actions `Check packages` workflow runs those checks and builds package archives. The `Publish packages` workflow runs on manual dispatch after CI passes. Its token needs `packages: write`, which the workflow declares. Publication uses the repository's `GITHUB_TOKEN` and each package's own registry endpoint.

## Use a package

GitHub Packages requires authentication to install packages, including public packages. Use a token with `read:packages` for local installation. See GitHub's registry instructions for [npm](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry), [Maven](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-apache-maven-registry), [NuGet](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-nuget-registry), and [RubyGems](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-rubygems-registry). Keep tokens in your package manager's user configuration, never in this repository.

Package coordinates follow these patterns:

```text
Maven     io.github.xmori:initials-from-name:1.0.0
npm       @x-mori/env-required@1.0.0
NuGet     XMori.IsPrivateIp 1.0.0
RubyGems  x-mori-port-check 1.0.0
```

## Verify publication

`node scripts/check-inventory.mjs` proves the source split. After a publish run, `node scripts/check-published.mjs` queries GitHub's package API and checks every distinct package name in the repository. The `Verify published packages` workflow runs the same check with a token that has `packages: read`. It reports missing names instead of counting source folders as published packages.

For later releases, increment the version in each changed package before dispatching the publish workflow again. GitHub Packages counts a new name as a new package; another version of the same name remains one package listing.
