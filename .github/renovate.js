module.exports = {
  username: "renovate-release",
  gitAuthor: "Renovate Bot <bot@renovateapp.com>",
  onboarding: false,
  platform: "github",
  repositories: [
    "jmmaloney4/charts"
  ],
  allowPostUpgradeCommandTemplating: true,
  allowedPostUpgradeCommands: ['^(sed|awk)*']
}
