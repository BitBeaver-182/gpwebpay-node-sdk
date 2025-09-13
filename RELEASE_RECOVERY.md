# Release Recovery Guide

This guide explains how to recover from failed Lerna releases and prevent future issues.

## Problem: Orphaned Tags After Failed Release

When Lerna fails during publish, it can leave orphaned tags that prevent future releases.

**Symptoms:**
```
lerna ERR! fatal: tag '@gpwebpay-node-sdk/core@1.2.0' already exists
```

## Automated Recovery (Now Implemented)

The GitHub Actions workflow now automatically cleans up failed releases:

1. **Detects failure** during `lerna publish`
2. **Identifies new tags** created during the failed run
3. **Deletes orphaned tags** both locally and remotely
4. **Resets version changes** in package.json files
5. **Fails the workflow** to indicate the issue

## Manual Recovery Steps

If you need to manually clean up a failed release:

### 1. Find Problematic Tags
```bash
# Check local tags
git tag | grep "@gpwebpay-node-sdk"

# Check remote tags
git ls-remote --tags origin | grep "@gpwebpay-node-sdk"
```

### 2. Delete Orphaned Tags
```bash
# Delete locally
git tag -d @gpwebpay-node-sdk/core@1.2.0

# Delete remotely
git push origin :refs/tags/@gpwebpay-node-sdk/core@1.2.0
```

### 3. Reset Package Versions (if needed)
```bash
# Reset any uncommitted version changes
git checkout HEAD -- packages/*/package.json

# Or manually edit package.json to correct version
```

### 4. Trigger New Release
```bash
# Create empty commit to trigger workflow
git commit --allow-empty -m "chore: trigger release after cleanup"
git push origin main
```

## Prevention Strategies

### 1. Workflow Improvements ✅ (Implemented)
- Automatic tag cleanup on failure
- Version reset on failure
- Better error reporting

### 2. Alternative: Use Lerna's `--no-git-tag-version`
```yaml
# In publish.yml - separate version and publish steps
- name: Version packages
  run: npx lerna version --yes --conventional-commits --no-git-tag-version

- name: Git commit and tag
  run: |
    git add .
    git commit -m "chore: version packages"
    # Create tags manually after successful version

- name: Publish packages
  run: npx lerna publish from-package --yes
```

### 3. Add Pre-publish Checks
```yaml
- name: Pre-publish validation
  run: |
    # Check that packages build successfully
    npx lerna run build --stream --sort

    # Check that tests pass
    npx lerna run test --stream --sort

    # Validate package.json files
    npx lerna exec -- npm pack --dry-run
```

## Monitoring and Alerts

### GitHub Actions Status
- Check Actions tab for workflow status
- Failed workflows will show detailed logs
- Automatic cleanup will be logged

### NPM Package Status
```bash
# Check if package was actually published
npm view @gpwebpay-node-sdk/core versions --json

# Check latest version
npm view @gpwebpay-node-sdk/core version
```

## Common Failure Causes

1. **NPM Authentication** - Invalid `NPM_TOKEN`
2. **Network Issues** - Temporary registry problems
3. **Package Validation** - Build or test failures
4. **Git Permissions** - Missing `GITHUB_TOKEN` permissions
5. **Tag Conflicts** - Previous failed releases (now auto-fixed)

## Best Practices

1. **Test locally first**:
   ```bash
   pnpm build
   pnpm test
   npx lerna version --no-git-tag-version --no-push
   ```

2. **Use conventional commits** for proper versioning:
   ```
   fix: bug fix (patch release)
   feat: new feature (minor release)
   feat!: breaking change (major release)
   ```

3. **Monitor releases** via GitHub notifications and npm registry

4. **Keep dependencies updated** to avoid compatibility issues