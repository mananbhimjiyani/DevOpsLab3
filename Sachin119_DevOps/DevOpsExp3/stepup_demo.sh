#!/bin/bash

# Initialize a new git repository
git init

# Create initial commit
echo "# Git Branching Model Demo" > README.md
git add README.md
git commit -m "Initial commit"

# Create and switch to develop branch
git checkout -b develop

# Create feature branches
git checkout -b feature/user-authentication
echo "User authentication implementation" > auth.txt
git add auth.txt
git commit -m "Add user authentication"

# Create another feature branch
git checkout develop
git checkout -b feature/user-profile
echo "User profile implementation" > profile.txt
git add profile.txt
git commit -m "Add user profile"

# Create a release branch
git checkout develop
git checkout -b release/1.0.0

echo "Demo setup complete!"
echo "Current branch structure:"
git log --all --graph --oneline --decorate