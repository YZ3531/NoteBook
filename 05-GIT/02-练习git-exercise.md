# git 练习



## 启动gitbash

操作：在某个文件夹下右键，在弹出的菜单中选中`git bash here`

![1568863730932](02-练习git-exercise.assets/1568863730932.png)



## 从gitbash中退出

操作：

方法一：在命令行中输入exit，按下回车

![1568863910171](02-练习git-exercise.assets/1568863910171.png)

方法二：直接关闭本窗口。

## 建立git仓库

操作步骤：

- 建立一个空文件夹。例如 `d:/git`

- 在此文件夹下，启动git bash

- 输入 命令 git init，并回车

  ![1568864162355](02-练习git-exercise.assets/1568864162355.png)

如果看到initialized empty git repository in D:/git/.git/ 则表示建立git仓库成功。



## 检查是否成功建立git仓库

在指定目录下运行git init 命令之后，会在这个目录下创建一个文件夹 `.git` 。注意：

- 这个文件夹的名字前有一个.
- 这个文件夹默认具有有隐藏属性，你是看不见这个文件夹的。

如果想看到这个文件夹，你可以有如下两个方法：

方法一：修改资源管理器的设置

![显示隐藏文件及文件夹](02-练习git-exercise.assets/1568865746534.png)

方法二：在此目录下打下gitbash 运行命令`ls -a`。

这个命令可以列出所有的文件及文件夹，也包含具备隐藏属性的文件及文件夹。如果看到 './git' 就表示确定建立了git仓库。

## 掌握ls命令

说明：ls命令用来列出当前目录下的文件及文件夹。

示例：

现在在d盘根目录，则 `ls` 会列出d盘根目录下所有的文件及文件夹，类似于这样。

![1568864711497](02-练习git-exercise.assets/1568864711497.png)

`ls -a`  :  查看目录文件列表 包括隐藏文件

## 掌握cd命令

cd命令用来切换目录操作路径。

![1568864480106](02-练习git-exercise.assets/1568864480106.png)

格式：

`cd 目录名`  作用是进入指定目录名。

`cd ..`  作用是回退到上一级目录。 注意是 `cd+ 空格+ 两个点`

示例：

`cd abc` 作用是进入当前操作目录下的abc目录中。

## 掌握上下方向键 

上下方向键，可以调出历史命令。

## 掌握tab键的补全功能

tab:智能补全

假设你现在在d:/git目录下，这个目录下有两个文件夹：student, teacher. 

![1568865253185](02-练习git-exercise.assets/1568865253185.png)

如查你打算进入student目录，则应该：

1. 完全使用命令 `cd student` 
2. 由于student这个单词比较长，你可以只键入它的一部分，例如： `cd  stu` 然后再按下`tab`键，就可以看到它会自动把命令补全为` cd student/`

## 查看git仓库的状态

- 启动 gitbash

- 键入命令：git status，并回车。

  这个命令会显示当前仓库的状态。这个状态是变化的。

  如果你是新建的一个空的git仓库，里面一个文件也没有，则可能会看到如下的内容。

![1568866528642](02-练习git-exercise.assets/1568866528642.png)



## 查看未跟踪状态

还以D:/git这个目录为例。

- 在这个目录下，新建一个文本文件，命名为readm.txt。

- 再次查看git的状态：在gitbash 中输入命令`git status`

  ![1568866791521](02-练习git-exercise.assets/1568866791521.png)

此时说明这个readme.txt文件还没有托管到git仓库中，所以状态是`untracked`



## 把未跟踪的文件添加git仓库中

命令格式: `git add 文件名`

接着上一个任务，把readme.txt添加到仓库中。

![1568867119226](02-练习git-exercise.assets/1568867119226.png)

运行命令：`git add readme.txt` 如果这个命令没有报出错误来，则说明这个操作已经成功了。

再次查看当前仓库的状态。



## 查看git提交记录 

每运行一次commit ，就会生产一个提交记录。 我们通过git log命令来查看提交记录。

`git log`

如果你一次commit命令都没有运行的话，通过git log命令会得到类似于如下的效果。

![1568871125471](02-练习git-exercise.assets/1568871125471.png)

## 提交修改

当我们修改了仓库时（新建文件，删除文件，修改文件）都需要：

1. 添加到暂存区（git add）

2. 提交修改(git commit)

   

命令格式：  `git commit -m "对本次修改的说明"`

提交成功之后，可以在`git log`命令的结果中看到本次提交的内容。

## 从工作区中恢复

目标：掌握从工作区中恢复代码的能力

步骤：

>初始化一个仓库
>
>$ git  init demo 
>
>进入仓库
>
>$ cd demo
>
>新建两个文件index.html, index.css
>
>并输入一些内容
>
>添加这两个文件到暂存区
>
>$ git add index.html index.css
>
>提交到仓库
>
>$ git commit -m "第一次提交"
>
>检测仓库的状态
>
>$ git status

下面开始修改这两个文件的内容，例如：在文件的最后都添加一段横线。

好的，现在这两个文件都被修改了，但没有还提交到暂存区。我们的目标是恢复到添加一段横线之前的状态。

当然，你可以在vscode中使用ctrl + z来撤消。但，我们可以使用git 操作来撤销。 则操作流程是？





## 从暂存区中恢复

目标：掌握从暂存区中恢复代码的能力

步骤：

> 初始化一个仓库
>
> $ git  init demo 
>
> 进入仓库
>
> $ cd demo
>
> 新建两个文件index.html, index.css
>
> 并输入一些内容
>
> 添加这两个文件到暂存区
>
> $ git add index.html index.css
>
> 提交到仓库
>
> $ git commit -m "第一次提交"
>
> 检测仓库的状态
>
> $ git status
>
> 下面开始修改这两个文件的内容，例如：在文件的最后都添加一段横线。
>
> 再次添加这两个文件到暂存区
>
> $ git add index.html index.css
>
> 

好的，现在这两个文件都被修改了，并且提交到暂存区（此时并没有commit）。我们的目标是恢复到添加一段横线之前的状态。

使用git 操作来撤销。 则操作流程是？



## 从仓库中恢复

目标：掌握从仓库中恢复代码的能力

步骤：

> 初始化一个仓库
>
> $ git  init demo 
>
> 进入仓库
>
> $ cd demo
>
> 新建两个文件index.html, index.css
>
> 并输入一些内容
>
> 添加这两个文件到暂存区
>
> $ git add index.html index.css
>
> 提交到仓库
>
> $ git commit -m "第一次提交"
>
> 检测仓库的状态
>
> $ git status
>
> 下面开始修改这两个文件的内容，例如：在文件的最后都添加一段横线。
>
> 再次添加这两个文件到暂存区
>
> $ git add index.html index.css
>
> 再次提交到仓库
>
> $ git commit -m "第二次提交"
>
> 

好的，现在这两个文件都被修改了，并且**已经提交到仓库区**。我们的目标是恢复到添加一段横线之前的状态。

使用git 操作来撤销。 则操作流程是？







## git-删除文件

> **`目标`**: 学会删除工作区文件 以及 放入到暂存区
>
> ```bash
> # 删除工作区文件，并且将这次删除放入暂存区
> $ git rm [file1] [file2] ...
> 
> # 停止追踪指定文件，但该文件会保留在工作区
> $ git rm --cached [file]
> 
> ```
>
> **`任务`:** 
>
> 1. 将a.js在工作区删除,并放入后暂存区,  
> 2. 将已提交过的b.js 停止追踪, 
> 3. 查看状态
>
> **路径** 
>
> ```bash
> # 初始化一个仓库
> $ git  init demo 
> 
> # 进入仓库
> $ cd demo
> 
> # 新建a.js b.js c.js 
> $ touch a.js b.js c.js
> 
> # 提交a b c到暂存区
> $  git add . 
> 
> # 提交暂存区到仓库
> $ git commit -m "提交"
> 
> # 删除a.js并放入暂存区
> $ git rm a.js 
> 
> # 停止追踪b.js
> $ git rm --cached b.js
> 
> 
> ```






## 分支管理-创建并切换分支



> 定义:一旦我们初始化仓库完成,就自动帮我们创建了一个**master主线分支**,使用其他**分支**意味着你可以把你的工作从开发**主线**上分离开来，以免影响开发主线。
>
> ```bash 
># 参考命令
> # 新建一个分支
> $ git branch <分支名称>
> # 切换到指定分支
> $ git checkout <分支名称>
> # 新建分支并切换到该分支
> $ git checkout -b <分支名称>
> #删除分支 
> $ git branch -d <分支名称>
> # 列出所有本地分支
> $ git branch 
> # 新建一个分支，指向指定commit
> $ git branch [branch] [commit]
> ```
> 
>**`任务`**: 
> 
>1. 初始化一个仓库
> 2. 新建一个hello.js文件，其中的内容是"masterjs"并提交到git仓库
> 3. 新建一个分支dev
> 4. 切换到dev分支下
> 5. 在hello.js中新增一行"devjs"
> 6. 新建一个dev.css文件，并提交到dev分支
> 7. 回到master分支
> 
>**`路径`**: 
> 
>```bash 
> # 初始化仓库
> $ git  init demo 
> 
> # 新建hello.js并添加到仓库
> 
> # 新建一个dev分支
> $ git  branch dev
> # 切换到dev分支下
> $ git checkout dev 
> 
> ```

## git-合并分支-无冲突

> **`目标`**:	了解分支合并,  并能了解合并快进模式
>
> **`任务`**: 
>
> 1. 初始化一个仓库
> 2. 新建文件a.js, 提交到仓库,
> 3. 新建分支dev, 在dev中修改a.js内容为hello world 提交到仓库,
> 4. 切回master分支,合并dev分支代码
>
> **`路径`**
>
> ```bash
> # 初始化一个仓库 
> $ git init demo 
> # 新建一个文件a.js
>$ git add a.js
> $ git commit -m "第一次提交代码"
># 新建dev并切换到该分支
> $ git checkout -b dev
> # 编辑a.js 为hello world 
> # 添加到暂存区
> $ git add a.js
> # 提交dev分支
> $ git commit -m  "提交dev修改"
> # 切换master分支
> $ git checkout master 
> # 合并dev分支代码
> $ git merge dev 
> ```
> 
> 

## git-分支合并-有冲突

> **`目标`**: 了解git分支合并时, 两个分支都存在更新的情况下 合并模式
>
> - 如果git分支合并时,当前分支和合并分支互有改动并且已提交到仓库, 合并时涉及到 代码和文件的合并
>
> **`任务`**: 
>
> 1. 初始化一个仓库,
> 2. 新建一个a.js 内容为 123, 提交到仓库, 
> 3. 拉取分支dev,
> 4. 在dev分支中修改a.js的内容为123dev,提交到仓库
> 5. 切回master分支,修改a.js内容为123master,提交到仓库,
> 6. 合并dev分支到master
>
> 提示
>
> - 可以通过打开文件的方式查找冲突的部位 手动修改 
>
> - vscode打开文件  进行解决
>
> **注意** 冲突文件 解决之后还处在修改状态 还未进行提交  需要进行提交



## git-clone远程仓库

> **`目标`**: 掌握如何从远程仓库拉取代码到本地 形成本地仓库
>
> - 当我们新加入一个团队 加入一个项目的时候 需要从远程仓库拉取代码到本地 进行开发
>
> ```
> # 从线上拉取代码到本地仓库
> git clone <远程仓库地址> <目录名(可忽略)>
> ```
>
> `路径`:
>
> ```
> # 本地clone
> $ git clone https://github.com/jquery/jquery.git
> ```



## 推送代码到github仓库

> **`目标`**: 掌握如何管理我们自己建立的github仓库
>
> `路径`:
>
> 1.  在github网站中添加一个名为`username.github.io`的仓库。
>   1. 添加一个readme.md文件
>    2. 添加一个.gitignore文件
> 2. 在本地clone
> 
> ```
># clone
> $ git clone https://github.com/XXX/XXXXXX.github.io.git
> 
> # 进入文件夹
> $ cd XXXXXX.github.io
> 
> # 编辑文件，并提交
> $ git add .
> $ git commit -m "修改内容"
> 
> # 推送
> git push
> ```



## Git远程仓库-拉取和更新

> **`目标`**: 掌握远程仓库到本地仓库的拉取和更新
>
> 当远程仓库有变化时:需要拉取远程仓库的更新到自己的仓库
>
> **注意** 上小节中讲到的**克隆** 代码,只是将远程仓库完整拷贝了一份,形成一份本地仓库,
>
> ```bash
># 拉取远程仓库更新 
> $ git pull 
> 
> ```
> 
> ```bash
># 下载远程仓库的所有变动
> $ git fetch [remote]
> 
> # 显示所有远程仓库
> $ git remote -v
> 
> # 显示某个远程仓库的信息
> $ git remote show [remote]
> 
> # 增加一个新的远程仓库，并命名
> $ git remote add [shortname] [url]
> 
> # 取回远程仓库的变化，并与本地分支合并
> $ git pull [remote] [branch]
> 
> # 上传本地指定分支到远程仓库
> $ git push [remote] [branch]
> 
> # 强行推送当前分支到远程仓库，即使有冲突
> $ git push [remote] --force
> 
> # 推送所有分支到远程仓库
> $ git push [remote] --all
> 
> ```
> 
> **`任务`**:  
>
> 1. 从上一小节的远程仓库 新增文件 
>
> 2. 从上一小节的远程仓库修改文件 
>
> 3. 从上一小节的远程仓库删除文件
>
> 4. 拉取更新到本地仓库
>



## Git的标签

> **`目标`**:了解git打标签的含义
>
> - 像其他版本控制系统（VCS）一样，Git 可以给历史中的某一个提交打上标签，以示重要。 比较有代表性的是人们会使用这个功能来标记发布结点（v1.0 等等）。
>
> 在 Git 中列出已有的标签是非常简单直观的。 只需要输入 `git tag`：
>
> ```bash
> $ git tag
> v0.1
> v1.3
> 
> ```

> ```bash
> # 列出所有tag
> $ git tag
> 
> # 新建一个tag在当前commit
> $ git tag [tag]
> 
> # 新建一个tag在指定commit
> $ git tag [tag] [commit]
> 
> # 删除本地tag
> $ git tag -d [tag]
> 
> # 删除远程tag
> $ git push origin :refs/tags/[tagName]
> 
> # 查看tag信息
> $ git show [tag]
> 
> # 提交指定tag
> $ git push [remote] [tag]
> 
> # 提交所有tag
> $ git push [remote] --tags
> 
> # 新建一个分支，指向某个tag
> $ git checkout -b [branch] [tag]
> 
> ```
>
> **`任务`**:  
>
> 1. 给自己的第一次提交版本打上标签 v1.0.0
>2. 给自己的第三次提交打上标签 v.1.0.1
> 3. 分别查看以上两个标签内容信息
> 
> **`路径`**
>
> ```bash
># 打标签
> $  git  tag v1.0.0 <commitid>
> $  git  tag v1.0.1 <commitid>
> # 查看标签
> $ git show v.1.0.0
> $ git show v.1.0.1
> ```



## git-忽略文件.gitignore

> **`目标`:** 知道什么是忽略文件, 并在git中应用 
>
> - 忽略文件是用来存放git工作区中 被默认不追踪的文件信息
> - 例如 npm依赖目录 node_modules
>
> **`任务`** :新建一个忽略文件,在git中忽略掉所有的js文件 和 node_modules 文件夹
>
> **`路径`**
>
> 1. 初始化仓库
> 2. 新建.gitignore
> 3. 写入以下配置信息
>
> ```bash 
> *.js
> node_modules
> ```
>
> 4. 新建立node_modules文件夹，并在文件夹下新增一个a.txt文件。
> 5. 修改a.txt的内容
> 6. git status 查看状态。检查git是否在跟踪a.txt的变化。









