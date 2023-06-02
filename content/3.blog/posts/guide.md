---
layout: post
title: Blog posting
description:
image: Link a preview image
date: 02/06/2023

author: Son Hong Do
position: Software Engineer at Sigma
avatar: https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/340922816_749073590254214_4809946987104508067_n.jpg?_nc_cat=101&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aGqfO7-qbacAX_0rMOg&_nc_ht=scontent.fhan17-1.fna&oh=00_AfAi0NW2sGTAbkG5mPG8PDIZplnS2VAXdMXqeQ8PfUF87w&oe=647DFCE4
avatarLink: https://sidebase.io

published: false
---

### Prequisites:
  - Github account: [Github](https://github.com)

### 1. Update existing blog
#### 1.1. Open blog editor on Stackblitz
  - Open <a href="https://pr.new/github.com/sigmaott/web-next" target="_blank">Stackblitz for Sigma Website</a> and login with your Github account
### 1.2. Waiting for the project to be loaded
  - Open Browser Preview window by clicking on the pop-up window at the bottom right corner
  ![Open Preview window](/blogs/guide1.png)

### 1.3. Navigate to blog folder
  - Navigate to `content/3.blog/posts` folder
  - Open the blog you want to update (e.g. `2.blog-1.md`)
  ![Open blog](/blogs/guide2.png)
### 1.4 Update the content
  - Update the content in the editor
  - Save the file by pressing `Ctrl + S` or `Cmd + S`
  **Note:** You can put the image asset on the public folder and use the relative path to the image asset in the blog content. For example, if you put the image asset on `public/blogs/guide1.png`, you can use the relative path `![Open blog](blogs/guide1.png)` in the blog content.

### 1.5. Create branch and commit
  - Click on Source Control icon on the left sidebar
  ![Open blog](/blogs/guide3.png)
  - Choose `Create & Push Branch`
  ![Open blog](/blogs/guide4.png)
  - Type in the branch name and press `Enter`
  ![Open blog](/blogs/guide5.png)
  
### 1.6. Commit & push changes
  - Type in the commit message
  - Click on the button `Commit & Push`
  ![Open blog](/blogs/guide6.png)
### 1.7. Create a pull request
  - Click on the button `Open New PR`
  ![Open blog](/blogs/guide7.png)
  - This will bring the user to the `Open a pull request` page
  - Click on the button `Create pull request`
### 1.8 Waiting for the pull request to be approved
  - The pull request will be reviewed by the repository owner
  - If the pull request is approved, the repository owner will merge the pull request
  - If the pull request is not approved, the repository owner will leave a comment on the pull request
  - The user will need to make the changes and commit & push the changes again
  - The user will need to create a new pull request.
