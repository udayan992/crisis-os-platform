# Crisis OS Platform

A modular, configurable "Shopify for Crisis Response" dashboard built with HTML, CSS, and JS. 

## Contribution Guide

Since we have multiple people working on this project (4 team members), we need a structured way to collaborate to avoid overwriting each other's code. 

### Prerequisites
Make sure everyone has Git installed and has cloned the repository:
```bash
git clone https://github.com/udayan992/crisis-os-platform.git
cd crisis-os-platform
```

### The Collaboration Workflow (Feature Branching)

Never work directly on the `main` branch. Instead, each person should create their own "feature branch". 

**1. Get the latest code before starting work:**
```bash
git checkout main
git pull origin main
```

**2. Create a new branch for your task:**
Name it something descriptive of what you are building. For example, if you are building the Volunteer page:
```bash
git checkout -b feature/volunteer-page
```

**3. Make your changes and test locally:**
Edit the HTML, CSS, or JS. Test it on your local server.

**4. Commit your changes:**
```bash
git add .
git commit -m "Add: Volunteer Coordination form page"
```

**5. Push your branch to GitHub:**
```bash
git push origin feature/volunteer-page
```

**6. Create a Pull Request (PR):**
Go to the GitHub repository page and click the "Compare & pull request" button. This allows the team to review the code before merging it into `main`.

**7. Resolve Conflicts (If they happen):**
If two people edited the exact same line of code, Git will flag a "Merge Conflict" when you try to merge the PR. You will need to open the file, decide which code to keep, commit the resolution, and complete the merge.

### Component Assignments (Recommendation)
To minimize conflicts entirely, it's best to divide the work logically. For example:
- **Person 1**: Main CMS logic (`app.js`) and Routing.
- **Person 2**: Core Dashboard Layout and Theming (`styles.css`).
- **Person 3**: Building the Resource Tracking sub-page HTML & CSS.
- **Person 4**: Building the Volunteer Coordination sub-page HTML & CSS.
