# DevOpsLab3 Repository Contribution Guidelines

Welcome to the DevOpsLab3 central repository! To keep our codebase clean and organized, **each student must work in their own personal branch** and must **not commit directly to the `main` branch**. This will ensure everyone’s work stays separate and manageable.

---

## 📋 Step-by-Step Instructions

### 1. Clone the Repository

Clone the repository to your local system:
- git clone 
- cd DevOpsLab3


### 2. Create Your Personal Branch

**Create a branch with your name** (replace `yourname` with your actual name):
- git checkout -b yourname

Switch to your branch:
- git checkout yourname
- git pull origin yourname


### 3. Add Your Folder and Experiments

**Create a folder with your name** and place all your experiment files inside:
- mkdir yourname


### 4. Stage, Commit, and Push Your Work
- git add yourname/
- git commit -m “Add experiments for yourname”
- git push origin yourname


### 5. Keep Your Branch Updated

Regularly update your branch with recent changes from `main`:
- git checkout main
- git pull origin main
- git checkout yourname
- git merge main


