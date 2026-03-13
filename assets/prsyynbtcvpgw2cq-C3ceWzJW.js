const n=`---
title: docker,k8s
urlname: prsyynbtcvpgw2cq
date: 2026-02-17 12:10:42 +0800
tags: []
description: docker介绍docker会给你的代码编译以后内置一套运行环境，做到一次封装，到处运行docker和虚拟机对比概念镜像：镜像就像是一个软件安装包。它是一个只读的、不可修改的模板，包含了运行某个应用所需的所有内容：代码、运行时环境、库、配置文件、系统工具等。（自己制作一般使用
  Dockerfi...
image: https://cdn.nlark.com/yuque/0/2026/jpeg/22718987/1771301639754-f7942b40-32a8-46ab-ab27-271fdf0d244e.jpeg
categories: []
---

# docker

## 介绍

docker会给你的代码编译以后内置一套运行环境，做到一次封装，到处运行

docker和虚拟机对比

![](articles/prsyynbtcvpgw2cq/1771301651070-c1f91acb-5e6d-4dea-ac48-cda1d11d9eb3.png)

## 概念

镜像：镜像就像是一个软件安装包。它是一个只读的、不可修改的模板，包含了运行某个应用所需的所有内容：代码、运行时环境、库、配置文件、系统工具等。（自己制作一般使用 Dockerfile文件）

容器：容器是镜像的运行实例，就像是用安装包安装好的、正在运行的软件，或者是用系统镜像启动的虚拟机。它是一个独立的、可运行的环境，基于镜像创建，拥有自己的文件系统、网络、进程空间

仓库：仓库就像是一个软件应用商店（比如 App Store、GitHub），专门用来存储和分发 Docker 镜像。仓库一般分为公有仓库和私有仓库

## 命令

### 运行镜像

\`\`\`javascript
docker run -t -i ubuntu /bin/bash
\`\`\`

这里的-t是让docker分配一个伪终端，-i是让容器的标准输入保持打开 也可以加-d 放后台运行，-p指定端口

### 查看容器

\`\`\`javascript
#docker ps -a
\`\`\`

### 进入容器

\`\`\`javascript
docker exec -it 容器名字或容器id /bin/bash
\`\`\`

可以使用docker inspect xx|grep merged 去找到虚拟机上的容器文件，这样就可以不用进入到容器内去操作了

### 挂载数据

映射文件或者目录 -v

\`\`\`javascript
docker run -d  -P   --name  web  -v  /lcoal/dir:/docker/dir:ro
\`\`\`

由于容器内的数据，一旦容器删除或者重启数据就会丢失，但是有时候我们需要保留数据，比如运行日志，这时候就可以让容器内的某些文件，来源于虚拟机的外部文件，这样就可以永久保留

\`\`\`javascript
docker run -d -P --name web -v ~/.bash_history:/.bash_history ubuntu /bin/bash
\`\`\`

有时候，某一个容器也可以使用另一个容器的数据

## 自定义镜像构建

Dockerfile分三部分组成： 基础镜像、镜像操作指令、启动时命令

打包

\`\`\`javascript
docker build -t xx .
\`\`\`

-t 指定名字（版本）

. 当前路径

常用命令

在dockerfile中所有的语法命令都是大写

FROM：指定基础镜像信息，指定容器的操作系统

MAINTAINER：指定维护者信息(可有可无)

RUN：在基础镜像上执行的命令。每个run就是一层，分层越多，镜像越大。

ENTRYPOINT：设置容器运行时的默认命令(容器内部运行的主程序)（和CMD任选其一）

CMD：指定容器运行时的默认命令(docker run /bin/bash后面加了其他命令那么cmd的命令将会被覆盖)（和ENTRYPOINT任选其一）

EXPOSE：暴露端口(指定容器的运行端口)

ENV：设置容器的环境变量，环境变量可以被RUN命令使用(声明容器运行需要的环境变量)

ADD：复制、解压。解压不支持.zip和.rar。只支持.tar.gz tar.bz2 支持url地址解压和复制(解压)

COPY：复制文件。不能解压。只能复制本地文件。文件需要和dockerfile在一个目录。(官方推荐复制使用COPY)

VOLUME：创建一个容器内的挂载点。既可以为宿主机挂载，也可以实现容器与容器之间挂载。

USER：设置运行镜像时使用的用户或者UID(可以不加)

WORKDIR：为后续指令设置的工作目录(指定ENTRYPOINT和CMD命令的工作目录)

ONBUILD：这个镜像可以被其他镜像引用。需要这个命令

ARG：传参。用于创建容器时，传递参数。ENV用于容器运行时设置环境变量

## 配置网络

docker设置三种类型网络

桥接

主机

none

## 容器编排

k8s

## 微服务

比如一个web页面会有很多接口，比如支付接口的调用会很大，可以把支付接口服务拆出来打包成单独的docker通过k8s去部署，这样可以单独去控制它（更新，监控，扩容等）

# k8s

k8s用于管理云平台中多个主机上的容器化的应用，Kubernetes的目标是让部署容器化的应用简单并且高效（powerful）,Kubernetes提供了应用部署，规划，更新，维护的一种机制

## 作用

自愈能力：当容器失败时，会对容器进行重启；当所部署的Node节点有问题时，会对容器进行重新部署和重新调度；当容器未通过监控检查时，会关闭此容器；直到容器正常运行时，才会对外提供服务。

水平扩容：通过简单的命令、用户界面或基于CPU的使用情况，能够对应用进行扩容和缩容。服务发现和负载均衡：开发者不需要使用额外的服务发现机制，就能够基于Kubernetes进行服务发现和负载均衡。

自动发布和回滚：Kubernetes能够程序化的发布应用和相关的配置。如果发布有问题，Kubernetes将能够回归发生的变更。保密和配置管理：在不需要重新构建镜像的情况下，可以部署和更新保密和应用配置。

存储编排：自动挂接存储系统，这些存储系统可以来自于本地、公共云提供商（例如：GCP和AWS）、网络存储(例如：NFS、iSCSI、Gluster、Ceph、Cinder和Floker等)。

## 概念

节点(Node)：机器上跑很多Pod（应用实例）

应用实例（pod)：应用实例，最小工作单元

一般来说一个pod里面只有一个容器，但如果两个容器关联性很强，也可以放在一个pod内

副本集(ReplicaSet)：用来保证指定数量的 Pod 副本始终处于运行状态的资源对象。它的核心使命只有一个：监控 Pod 数量，确保实际运行的 Pod 数 = 你定义的期望副本数

部署(Deployment)： 保证 Pod 数量

服务(Service)： 给 Pod 提供固定入口和负载均衡

网关(Ingress)：负责外网进来

命名空间(Namespace)： 集群里的隔离文件夹（隔离pre,prod环境）

DaemonSet

StatefuleSet

Job

CronJob

服务（service）：让外部网络可以访问到集群中的数据或者接口

![](articles/prsyynbtcvpgw2cq/1771412648140-0dea2265-2324-4e8b-99b1-967cad3127a3.png)

## 节点

master节点和node节点。

1）master节点主要负责集群的控制，对pod进行调度，以及令牌管理等等功能。

2）node节点主要是负责干活，启动容器、管理容器。

3）master节点和node节点一般不要部署在一台机器上。实际生产上，从高可用考虑，是需要部署多个master节点的

## 服务

K8s运行容器通过controller来做，访问容器通过service来做。 在Serive定义时，我们需要指定spec.type字段，这个字段拥有四个选项：

1）ClusterIP。默认值。给这个Service分配一个Cluster IP，它是Kubernetes系统自动分配的虚拟IP，因此只能在集群内部访问。

2） NodePort。将Service通过指定的Node上的端口暴露给外部。通过此方法，访问任意一个NodeIP:nodePort都将路由到ClusterIP，从而成功获得该服务。

3）LoadBalancer。在 NodePort 的基础上，借助 cloud provider 创建一个外部的负载均衡器，并将请求转发到 :NodePort。此模式只能在云服务器（AWS等）上使用。

4）ExternalName。将服务通过 DNS CNAME 记录方式转发到指定的域名（通过 spec.externlName 设定）。

# ansible

核心用来批量、自动化地管理服务器

比如给 100 台服务器批量安装 nginx、批量查看磁盘使用率，不用逐台登录

批量部署应用到多台服务器，比如把 Java 项目的 jar 包分发到所有应用服务器，然后重启服务

Ansible vs k8s

Ansible：聚焦自动化操作服务器 / 设备，是一次性 / 周期性的运维自动化工具（比如部署软件、改配置）

k8s：聚焦容器化应用的生命周期管理，是持续运行的集群编排平台（比如保证应用副本数、自动扩缩容、故障自愈）。

实际场景中，常先用 Ansible 部署 k8s 集群，再用 k8s 管理容器应用。

# jenkins

新建任务流程

1.任务名称

2.源码管理(git)

3.构建触发器（定时，轮询，代码提交触发）

4.环境设置（node版本）

5.构建步骤（流水线）

另一种方式可以在项目代码中编写jenkinsfile文件，内容就是流水线的内容

![](articles/prsyynbtcvpgw2cq/1771480635304-980d6411-f248-4fdc-8442-2cd25a122140.png)

# 完整流程

前端代码

\`\`\`javascript
<!-- index.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Jenkins + Docker + K8s 前端部署 Demo</title>
    <style>
        body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-size: 24px; }
    </style>
</head>
<body>
    <div>
        <h1>前端自动部署 Demo 成功！</h1>
        <p>部署方式：Jenkins → Docker → Nginx → K8s</p>
    </div>
</body>
</html>
\`\`\`

nginx配置文件

\`\`\`javascript
# nginx.conf
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

        # 前端静态资源目录
        root   /usr/share/nginx/html;
        index  index.html index.htm;

        # 解决前端路由刷新404问题
        location / {
            try_files $uri $uri/ /index.html;
        }

        # 禁止访问隐藏文件
        location ~ //. {
            deny all;
        }

        # 日志配置
        access_log  /var/log/nginx/access.log;
        error_log   /var/log/nginx/error.log;
    }
}
\`\`\`

Dockerfile文件

\`\`\`javascript
# 基于官方Nginx镜像
FROM nginx:1.25-alpine

# 维护者信息
LABEL maintainer="your-name <your-email@example.com>"

# 删除Nginx默认配置
RUN rm /etc/nginx/nginx.conf

# 复制自定义Nginx配置
COPY nginx.conf /etc/nginx/

# 复制前端静态资源到Nginx默认目录
COPY index.html /usr/share/nginx/html/

# 暴露80端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]
\`\`\`

k8s部署

创建 frontend-deploy.yaml，包含 Deployment 和 Service

\`\`\`javascript
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-demo
  namespace: default  # 可根据实际情况修改命名空间
spec:
  replicas: 2  # 副本数
  selector:
    matchLabels:
      app: frontend-demo
  template:
    metadata:
      labels:
        app: frontend-demo
    spec:
      containers:
      - name: frontend-demo
        image: \${DOCKER_IMAGE}  # Jenkins构建时替换为实际镜像地址
        ports:
        - containerPort: 80
        # 健康检查
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
        resources:
          limits:
            cpu: "0.5"
            memory: "512Mi"
          requests:
            cpu: "0.1"
            memory: "128Mi"
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-demo-service
  namespace: default
spec:
  type: NodePort  # 对外暴露端口，生产环境可改用LoadBalancer/Ingress
  selector:
    app: frontend-demo
  ports:
  - port: 80        # Service端口
    targetPort: 80  # 容器端口
    nodePort: 30080 # 节点端口（范围30000-32767）
\`\`\`

jenkins自动化

\`\`\`javascript
pipeline {
    agent any  # 使用任意可用的Jenkins节点

    # 定义环境变量
    environment {
        DOCKER_REGISTRY = "your-registry.example.com"  # 替换为你的镜像仓库地址（如阿里云/Harbor）
        DOCKER_NAMESPACE = "frontend"                  # 镜像仓库命名空间
        IMAGE_NAME = "frontend-demo"
        IMAGE_TAG = "\${BUILD_NUMBER}-\${GIT_COMMIT.substring(0,7)}"  # 镜像标签：构建号+Git提交ID前7位
        FULL_IMAGE_NAME = "\${DOCKER_REGISTRY}/\${DOCKER_NAMESPACE}/\${IMAGE_NAME}:\${IMAGE_TAG}"
        K8S_CONFIG = "./frontend-deploy.yaml"
    }

    stages {
        # 1. 拉取代码（需提前配置Jenkins代码仓库凭证）
        stage('拉取代码') {
            steps {
                echo "开始拉取代码..."
                checkout scm  # 自动拉取Jenkins配置的代码仓库
            }
        }

        # 2. 构建Docker镜像
        stage('构建Docker镜像') {
            steps {
                echo "开始构建Docker镜像: \${FULL_IMAGE_NAME}"
                sh "docker build -t \${FULL_IMAGE_NAME} ."
            }
        }

        # 3. 推送Docker镜像到仓库
        stage('推送Docker镜像') {
            steps {
                echo "登录Docker仓库并推送镜像..."
                sh "docker login \${DOCKER_REGISTRY} -u your-username -p your-password"  # 建议用Jenkins凭证管理，避免明文密码
                sh "docker push \${FULL_IMAGE_NAME}"
                sh "docker logout \${DOCKER_REGISTRY}"
            }
        }

        # 4. 部署到K8s
        stage('部署到K8s') {
            steps {
                echo "开始部署到Kubernetes..."
                # 替换K8s配置中的镜像地址
                sh "sed -i 's|//\${DOCKER_IMAGE}|\${FULL_IMAGE_NAME}|g' \${K8S_CONFIG}"
                # 应用K8s配置
                sh "kubectl apply -f \${K8S_CONFIG}"
                # 验证部署状态
                sh "kubectl rollout status deployment/frontend-demo -n default"
                echo "部署完成！"
            }
        }
    }

    post {
        # 构建完成后清理
        always {
            echo "清理临时资源..."
            sh "docker rmi \${FULL_IMAGE_NAME} || true"  # 删除本地镜像
            sh "docker system prune -f"  # 清理无用镜像/容器
        }
        # 构建成功通知（可选）
        success {
            echo "前端项目部署成功！访问地址：http://<K8s节点IP>:30080"
            // 可添加邮件/钉钉/企业微信通知
        }
        # 构建失败通知
        failure {
            echo "前端项目部署失败！请检查日志排查问题。"
            // 可添加失败通知
        }
    }
}
\`\`\`
`;export{n as default};
