# git 笔记

## git基本介绍

作用：

- 管理历史记录
- 多人合作

分布式版本管理软件

## git-bash的基本使用

- 启动
- 关闭
- 命令
  - mkdir 创建目录
  - cd 切换目录
  - ls 查看目录
  - ls -a 查看目录，包含隐藏目录
  - touch  新建文件 
  - rm 删除文件 
  - clear 清屏
  - cat 查看文件内容
  - 方向键：切换历史命令
  - tab: 补全

## git的基本流程

- 1. 初始git仓库

  - `git init`
  - 自动创建一个隐藏目录".git"

  

- 3. 把文件添加到git

  - git add 文件名.后缀名

- 4. 提交本次修改

  - git commit -m  "提交说明"
  - 如果是第一次提交，还要设置邮箱和用户名

- 5. 重复2,3,4
  6. 通过git log来观察每次的提交信息。

  

## git三个工作区域

- 工作区
  - 用户操作文件的区域
- 暂存区
  - `git add 文件名`  。 把对文件的修改加入暂存区
- 仓库
  - `git commit -m "提交说明"` 。把暂存区的内容，放入仓库 ，产生新版本。

## git文件的四种状态

- 未跟踪（Untracked）。这个文件对于git来说是新的。从来没有add过。git不会对它进行文件管理。
- 已暂存。通过add命令。
- 已提交。通过commit命令。
- 已修改。提交commit之后，又编辑了。

## git的后悔药

- 只在工作区修改了，但没有add。

  -  `git checkout -- filename.txt`

- 工作区修改了，也add了。

  - git reset HEAD filename.txt
  - git checkout -- filename.txt

- add,commit之后，就进入仓库

  从仓库中恢复：

  - 知道commitID . `git log --oneline`
  - git checkout commitID filename.txt
  - 注意：通过 git status ,检查是否干净"nothing to commit, working tree clean"，如果不是，需要再次commit。

## git分支管理

- git init 就有master分支
- git checkout -b dev； 创建并切换分支 dev

- master 分支不做开发。只用来merge。

- 开发建立dev分支。如果新功能也要合并到master.

- 修复bug，从master拉一个新的分支（一般会用bug12132命名），修复bug结束，

- 切回master，从master去merge dug分支。



## git合并分支时的冲突

- 多个分支修改了相同的文件，无法自动合并。
- 手动解决冲突
  - 解决冲突之后，要commit



## git使用分支的基本流程

在项目开发过程中，我们至少会接触三个分支：

- 名为master的主分支

  master分支表示稳定的，可以正常运行的主分支。在我们初始化git时，它就会自动被创建。

- 名为dev的开发分支

  开发中，我们一般会新建一个名为 dev的分支(dev是development的简写，表示开发)，在这个基础上进行开发，测试，然后合并到master分支上。当然了，名字也不一定必须是dev。

- 名为bug的临时分支。

## github基本操作

- 创建一个仓库

- clone 到本地

  `git clone  https://github.com/yanwanpeng666/learngit.git`

- 本地正常操作
  - git add 
  - git commit
- 同步到github
  
- git push(是否有权限)
  
- 从远程github拉取代码
  
  - git pull





