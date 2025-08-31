# Git Branching Model

This repository demonstrates a standard Git branching model to help teams understand and implement an efficient workflow for faster integration and collaboration.

## Branching Strategy

### Main Branches

1. **main**
   - Production-ready state
   - Protected branch (direct commits not allowed)
   - Only updated via Pull Requests from `develop` or hotfix branches

2. **develop**
   - Integration branch for features
   - Reflects the latest delivered development changes
   - Only updated via Pull Requests from feature branches

### Supporting Branches

1. **Feature Branches**
   - Branch from: `develop`
   - Naming: `feature/feature-name` or `feature/issue-number-description`
   - Merge back into: `develop`
   - Example: `git checkout -b feature/user-authentication develop`

2. **Release Branches**
   - Branch from: `develop`
   - Naming: `release/version-number`
   - Merge into: `develop` and `main`
   - Example: `git checkout -b release/1.0.0 develop`

3. **Hotfix Branches**
   - Branch from: `main`
   - Naming: `hotfix/issue-description`
   - Merge into: `develop` and `main`
   - Example: `git checkout -b hotfix/login-bug main`

## Workflow

1. Start a new feature:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. Commit changes:
   ```bash
   git add .
   git commit -m "Add your commit message"
   ```

3. Push to remote:
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. Create a Pull Request (PR) from your feature branch to `develop`

5. After PR approval and merge, delete the feature branch

## Best Practices

- Keep commits small and focused
- Write clear commit messages
- Pull latest changes before pushing
- Delete merged branches
- Use `.gitignore` for build artifacts and dependencies
- Protect main branches (main, develop)
- Require PR reviews before merging
- Run tests before creating PRs

## Example Commands

```bash
# Create and switch to a new feature branch
git checkout -b feature/add-login develop

# After making changes
git add .
git commit -m "Implement user login functionality"

# Push to remote
git push -u origin feature/add-login

# After PR is merged, clean up
git checkout develop
git pull origin develop
git branch -d feature/add-login
git push origin --delete feature/add-login  # if pushed to remote
```

## Visual Representation

```
main       *-------------------* (v1.0)-------------------* (v2.0)
            \                 / \                       /
             \               /   \                     /
              \             /     \                   /
develop        *-----*-----*-------* (release/1.0)---* (release/2.0)
                \   /     /         \               /
                 \ /     /           \             /
feature/login     *-----* (feature/A) \           /
                                        \         /
                                         *-------* (feature/B)
```

### Detailed Branch Flow

```
Legend:
* - Commit
/ \ - Branch/Merge
|   - Development timeline

main       *-------------------* (v1.0)-------------------* (v2.0)
            \                 / \
             \       Release /   \ Hotfix
              \      1.0.0  /     \ 1.0.1
               \           /       \
develop        *-----*-----*---------* (merged hotfix)
                \   /     / \
                 \ /     /   \
feature/login     *-----*     \ Feature B
                  |           |
                  |           *---* (feature/B)
                  |               |
                  |               * (merged)
                  |
                  *---* (feature/A)
                      |
                      * (merged)
```

## Branch Naming Conventions

- Use lowercase with hyphens for branch names
- Prefix with type (feature/, bugfix/, hotfix/, release/)
- Be descriptive but concise
- Include issue/ticket number if applicable

Example: `feature/123-add-user-profile`