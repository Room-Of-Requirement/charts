module.exports = {
    username: "renovate-release",
    gitAuthor: "Renovate Bot <bot@renovateapp.com>",
    onboarding: false,
    platform: "github",
    repositories: [
      "jmmaloney4/charts"
    ],
    enabled: true,
    timezone: "America/Chicago",
    extends: ["config:base"],
    rebaseWhen: "behind-base-branch",
    dependencyDashboard: true,
    dependencyDashboardTitle: "Renovate Dashboard",
    assignees: ["jmmaloney4"],
    prConcurrentLimit: 0,
    prHourlyLimit: 0,
    "helm-values": {
      "enabled": true
    },
    "helmv3": {
      "fileMatch": ["charts/.+/Chart\\.yaml$"]
    },
    "pre-commit": {
      "enabled": true
    },
    packageRules: [
      {
        "matchDatasources": ["helm"],
        "commitMessageTopic": "Helm chart {{depName}}",
        "separateMinorPatch": true
      },
      {
        matchDatasources: ["docker"],
        enabled: true,
        commitMessageTopic: "container image {{depName}}",
        commitMessageExtra: "to {{#if isSingleVersion}}v{{{newVersion}}}{{else}}{{{newValue}}}{{/if}}",
        matchUpdateTypes: ["major", "minor", "patch", "digest"],
      },
      {
        "matchUpdateTypes": ["digest"],
        "bumpVersion": "patch",
        "labels": ["dependency/digest"],
        automerge: true
      },
      {
        "matchUpdateTypes": ["minor"],
        "bumpVersion": "minor",
        "labels": ["dependency/minor"],
        automerge: true
      },
      {
        "matchUpdateTypes": ["patch"],
        "bumpVersion": "patch",
        "labels": ["dependency/patch"],
        automerge: true
      },
      {
        matchDatasources: ["docker"],
        matchPackageNames: ["docker.io/minio/minio", "docker.io/minio/mc"],
        versioning: "regex:^RELEASE\.(?<major>[0-9][0-9][0-9][0-9])-(?<minor>[0-9][0-9])-(?<patch>[0-9][0-9])T.*Z$"
      }
    ]
  }
