# Example Git Workflow Walkthrough

This document demonstrates a complete workflow using the Git branching model.

## 1. Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# View all branches
git branch -a
```

## 2. Starting a New Feature

```bash
# Make sure you're on develop branch and it's up to date
git checkout develop
git pull origin develop

# Create and switch to a new feature branch
git checkout -b feature/add-payment

# Make your changes
# ...

git add .
git commit -m "Implement payment processing"

# Push the feature branch to remote
git push -u origin feature/add-payment
```

## 3. Creating a Pull Request
1. Go to your Git hosting service (GitHub/GitLab/Bitbucket)
2. Create a new Pull Request from `feature/add-payment` to `develop`
3. Add reviewers
4. Wait for approval

## 4. After PR is Merged

```bash
# Switch to develop and pull latest
git checkout develop
git pull origin develop

# Delete the local feature branch
git branch -d feature/add-payment

# Delete the remote branch (if needed)
git push origin --delete feature/add-payment
```

## 5. Creating a Release

```bash
# Create a release branch from develop
git checkout -b release/1.0.0 develop

# Make any last-minute changes (version bumps, etc.)
# ...

git add .
git commit -m "Bump version to 1.0.0"

# Merge release into main
git checkout main
git merge --no-ff release/1.0.0 -m "Release 1.0.0"
git tag -a v1.0.0 -m "Version 1.0.0"

# Merge back into develop
git checkout develop
git merge --no-ff release/1.0.0

# Delete the release branch
git branch -d release/1.0.0

# Push everything
git push origin develop
git push origin main
git push --tags
```

## 6. Hotfix Workflow

```bash
# Create hotfix branch from main
git checkout -b hotfix/login-issue main

# Fix the issue
# ...

git add .
git commit -m "Fix login authentication issue"

# Merge hotfix into main
git checkout main
git merge --no-ff hotfix/login-issue
git tag -a v1.0.1 -m "Version 1.0.1"

# Merge hotfix into develop
git checkout develop
git merge --no-ff hotfix/login-issue

# Clean up
git branch -d hotfix/login-issue
git push origin develop
git push origin main
git push --tags
```
## Visualizing the Repository

To see the branch structure:

```bash
git log --all --graph --oneline --decorate
```

This will show you a visual representation of all branches and their relationships.