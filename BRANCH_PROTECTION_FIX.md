# Fix Branch Protection Rules for Automated Releases

## Problem
GitHub repository rules are blocking Lerna from pushing version commits during automated releases:

```
Repository rule violations found for refs/heads/main
- 3 of 3 required status checks are expected
```

## Solution Options

### Option 1: Allow GitHub Actions to Bypass Rules ✅ (Recommended)

1. **Go to Repository Settings**: https://github.com/BitBeaver-182/gpwebpay-node-sdk/settings/rules

2. **Edit Branch Protection Rule** for `main` branch

3. **Add Exception**: Under "Restrict pushes that create files"
   - Check "Allow specific actors to bypass"
   - Add: `github-actions[bot]` or the full GitHub App

4. **Alternative**: Use "Allow force pushes" → "Specify who can force push"
   - Add: `github-actions[bot]`

### Option 2: Use Personal Access Token

Update the workflow to use a PAT with admin permissions:

```yaml
- name: Checkout
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
    token: ${{ secrets.ADMIN_GITHUB_TOKEN }} # Instead of GITHUB_TOKEN
```

### Option 3: Modify Lerna Strategy

Change the release strategy to avoid pushing to main:

```yaml
- name: Lerna Publish
  run: |
    # Use from-package strategy - don't create version commits
    npx lerna publish from-package --yes --create-release github
```

But this requires pre-versioning the packages separately.

### Option 4: Create Release Branch

Modify workflow to create release branch instead of pushing to main:

```yaml
- name: Create Release Branch
  run: |
    BRANCH_NAME="release/$(date +%Y%m%d-%H%M%S)"
    git checkout -b "$BRANCH_NAME"

- name: Lerna Publish
  run: |
    npx lerna publish --yes --conventional-commits --create-release github

- name: Create Pull Request
  uses: peter-evans/create-pull-request@v5
  with:
    title: "chore: automated release"
    body: "Automated release created by Lerna"
```

## Recommended Fix

**Option 1** is the cleanest solution. Here's exactly what to do:

1. Go to: https://github.com/BitBeaver-182/gpwebpay-node-sdk/settings/rules
2. Click on the rule that protects `main` branch
3. Look for "Bypass restrictions" or "Allow specified actors to bypass"
4. Add one of these:
   - `github-actions[bot]`
   - `github-actions`
   - The specific GitHub App ID if different

This allows automated releases while keeping protection for human pushes.

## Test the Fix

After updating the rules, the next push should work:
```
✅ Pre-release cleanup completed
✅ Lerna publish completed successfully!
```

## Alternative Workaround

If you can't modify the branch protection rules, we can modify the workflow to use the "from-package" strategy, but that requires a different approach to versioning.