# AguaClara.github.io
Visualization Website for the Plant Operations Smartphone Tracker (POST) team of AguaClara

## Working locally on this repo
This repo is deployed through gh-pages, githubs' jekyll-based static website hosting service. This repo has two main branches, development and master. Master contains only the built site, not including any of the Jekyll pre-processing code. Development is only source code, and should not include any built files. To make editing simple, you should clone the two branches separately as suggested here:

### Repo initiation steps

1. Clone the repo into a folder
2. cd into the cloned repo
3. Switch to the development branch
4. Make a directory named "_site" in the cloned repo (this folder is already in the .gitignore, so it shouldn't be tracked by the current repo.
5. Clone the repo into the _site directory and make sure the _site directory is the root folder for that repo. 
6. You should be in the _site directory now, so ensure your branch is switched over to master. 
7. Switch the outer git repo over to development. Becuase the _site directory is in the gitignore, the inner repo shouldn't be affected. 
8. By the end, you should have the following folder structure: 
.
- _config.yml
- \<other Jekyll source directories>
- _site  
   - \<another git repo set to the master branch>  
- index.html
- .git \<this outer git repo is set to the development branch>

### Editing and pushing code
Once the repos are set up as shown in the Repo initiation stage, it's simple to push the source files and the built files online with two commits:

1. Edit code in the outer Jekyll repo 
2. Serve the website locally with the Jekyll application (`$jekyll serve`)
3. Test the website is behaving correctly on your browser locally at http://localhost:4000
4. Once verified the website is working correctly, commit with a reasonable message and push to the development branch
5. Cd into the _site directory to go into the inner repo. Some files will have been changed by Jekyll. You can see the changed built files with the `$git status` command.
6. Commit the changed files and push to the master branch.
7. Confirm Github is displaying the website correctly by visiting http://aguaclara.github.io. It might take up to 5 minutes to update.

### Developing a new feature
These steps outline the entire feature development cycle:

1. Go to development branch on AguaClara.github.io repo

`git checkout development`

2. Make sure your local branch is up to date

`git pull origin development`

3. Create a new feature branch off of the development branch

`git checkout -b yourname_featurename development`

4. Work on your feature. Commit often, with useful commit messages!

`git add -all`

`git commit -m “yourmessage”`

5. When your feature is finished, push to the remote branch of your feature

`git push -u origin yourname_featurename`

6. Go to our git project on your desktop, click “new pull request”

7. Set “base” to development, set “compare” to your feature, review the comparison it shows you

8. In the body of your pull request, describe your feature, and mention the members of your team. This will notify them that you’ve submitted a pull request for them to review.

9. If everything checks out, a team member can accept the pull request and merge the two branches. If the merge can be completed automatically, you can do it straight from the web. If not, click the (i) for more info on what to do, or follow the instructions towards the bottom of this tutorial.

10. After a successful merge, delete the old feature branch

`git branch -d yourname_featurename`
