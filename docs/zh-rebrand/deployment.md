在部署解决方案之前，建议您先查看本指南中有关架构图和区域支持等信息，然后按照下面的说明配置解决方案并将其部署到您的帐户中。

**部署时间**：约15分钟
## 部署概述

您可以在亚马逊云科技上部署并使用解决方案，过程如下：

- 步骤1：启动堆栈
    - [（选项 1）从全球区域启动堆栈](#launch-cognito)
    - [（选项 2）从中国区域启动堆栈](#launch-openid)
- 步骤2：[访问网页控制台](#launch-web-console)
- 步骤3：[创建数据传输任务](#create-task)

## 步骤1.（选项1）从全球区域启动堆栈 <a name="launch-cognito"></a>

!!! warning "重要提示"

    以下部署说明仅适用于全球区域。有关中国区域的部署说明，请参阅（选项2）从中国区域部署。

**从全球区域部署Amazon CloudFormation模板**

!!! note "注意"

    您需要承担运行数据传输解决方案时使用亚马逊云科技各项服务的成本费用。想要了解详细信息，请参阅本实施指南中的成本章节，以及解决方案中使用的每项服务的定价页面。

1. 登录到Amazon Web Services管理控制台，选择按钮以启动 `DataTransferHub-cognito.template` 模板。 您还可以选择直接[下载模板](https://s3.amazonaws.com/solutions-reference/data-transfer-hub/latest/DataTransferHub-cognito.template)进行部署。

    [![Launch Stack](./images/launch-stack.png)](https://console.aws.amazon.com/cloudformation/home#/stacks/create/template?stackName=DataTransferHub&templateURL=https://s3.amazonaws.com/solutions-reference/data-transfer-hub/latest/DataTransferHub-cognito.template)

2. 默认情况下，该模板将在您登录控制台后默认的区域启动，即美国东部（弗吉尼亚北部）区域。若需在指定的区域中启动该解决方案，请在控制台导航栏中的区域下拉列表中选择。

3. 在**创建堆栈**页面上，确认Amazon S3 URL文本框中显示正确的模板URL，然后选择**下一步**。

4. 在**指定堆栈详细信息**页面上，为您的解决方案堆栈分配一个账户内唯一且符合命名要求的名称。有关命名字符限制的信息，请参阅*Amazon Identity and Access Management用户指南*中的[IAM 和 STS 限制](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-limits.html)。
5. 在**参数**部分，查看此解决方案模板的参数并根据需要进行修改。

    | 参数名称 | 默认值 | 描述 |
    |----------|--------|--------|
    | **AdminEmail** | 无|	用于接收临时登录密码的管理员邮箱。

6. 选择**下一步**。

7. 在**配置堆栈选项**页面上，保留默认值并选择**下一步**。

8. 在**审核**页面，查看并确认设置。确保选中确认模板将创建Amazon Identity and Access Management（IAM）资源的复选框。选择**下一步**。

9. 选择**创建堆栈**以部署堆栈。

您可以在Amazon CloudFormation控制台的**状态**列中查看堆栈的状态。正常情况下，大约15分钟内可以看到状态为**CREATE_COMPLETE**。
## 步骤1.（选项2）从中国区域启动堆栈 <a name="launch-openid"></a>

!!! warning "重要提示"

    以下部署说明仅适用于中国区域。有关全球区域的部署说明，请参阅（选项1）从全球区域部署。

### 前提条件
1. 创建OIDC用户池。
2. 配置域名服务解析。

### 前提条件1：创建OIDC用户池
在Amazon Cognito尚不可用的区域，您可以使用OIDC提供身份验证。以下过程以亚马逊云科技合作伙伴[Authing](https://www.authing.cn/)为例，但您也可以选择其它可用的供应商。

1. 注册一个Authing开发者账号。有关更多信息，请参阅[如何注册帐户](https://docs.authing.cn/v2/)。
2. 登录到Authing。
3. 选择创建新用户池，输入名称，然后选择确认。
4. 创建OIDC认证的应用。
    1. 从左侧边栏选择并进入**应用**界面，选择**添加应用**。
    2. 选择**自建应用**。
    3. 输入应用名称，并输入认证地址。
    4. 选择**创建**。
5. 更新授权配置。
    1. 从左侧边栏选择并进入**应用**界面，选择**应用配置**，然后选择**授权配置**。
    2. **授权模式**选择**implicit**，返回类型选择**id_token**。
    3. id_token签名算法修改为**RS256**。
    4. 选择**保存**。

6. 配置回调链接。
    1. 从左侧边栏选择并进入**应用**界面，选择**应用配置**，然后选择**认证配置**。
    2. 将登录回调URL修改为 `https://<your-custom-domain>/authentication/callback`。
    3. 选择**保存**。
    !!! note "注意"

        请确保您上面填写的域名已在中国区完成ICP备案。

7. 更新登录控制。
    1. 从左侧边栏选择并进入**应用**界面，选择**登录控制**，然后选择**登录注册方式**。
    2. 登录方式请只选择**密码登录：邮箱**。
    3. 请**取消勾选**注册方式方式内的所有选项。
    4. 选择**保存**。

8. 创建管理员用户。
    1. 从左侧边栏选择并进入**用户管理**界面，选择**用户列表**，然后选择**创建用户**。
    2. 选择邮箱模式。
    3. 输入用户的邮箱以及密码。
    4. 根据您的需要勾选`强制用户在首次登录时修改密码`。
    5. 选择**保存**。
    !!! note "注意"
        由于此解决方案不支持应用程序角色，所有用户都将获得管理员权限。

### 前提条件2：配置域名服务解析
配置域名服务 (DNS) 解析以将ICP许可域指向CloudFront默认域名。您也可以使用自己的DNS解析器。

以下示例介绍如何配置Amazon Route 53。

1. 在Amazon Route 53中创建托管区域。有关更多信息，请参阅[Amazon Route 53开发人员指南](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html)。

2. 为网页控制台URL创建一个CNAME记录。

    1. 从托管区域中，选择**创建记录**。
    1. 在**记录名称**输入框中，输入Host名。
    1. 在**记录类型**中选择**CNAME**。
    1. 在值字段中，输入后续在CloudFormation**部署完成后**，所输出的**PortalUrl**参数。
    1. 选择**创建记录**。

3. 向CloudFront的分配添加备用域名。

    1. 在CloudFront中配置对应的域名，通过在列表中找到PortalURL的分配ID并选择该ID来打开CloudFront控制台。
    1. 点击**编辑**，并将上一步中Route 53的记录添加到`备用域名(CNAME)`中。

**从中国区域部署Amazon CloudFormation模板**

此自动化Amazon CloudFormation模板从亚马逊云科技中国区域部署数据传输解决方案。启动堆栈之前，请务必完成前提条件。

!!! note "注意"

    您需要承担运行数据传输解决方案时使用亚马逊云科技各项服务的成本费用。想要了解详细信息，请参阅本实施指南中的成本章节，以及解决方案中使用的每项服务的定价页面。

1. 登录到Amazon Web Services管理控制台，选择按钮以启动 `DataTransferHub-openid.template` 模板。您还可以选择直接[下载模板](https://s3.amazonaws.com/solutions-reference/data-transfer-hub/latest/DataTransferHub-openid.template)进行部署。

    [![Launch Stack](./images/launch-stack.png)](https://console.amazonaws.cn/cloudformation/home#/stacks/create/template?stackName=DataTransferHub&templateURL=https://s3.amazonaws.com/solutions-reference/data-transfer-hub/latest/DataTransferHub-openid.template)

2. 模板将在您的默认区域启动。要在不同的区域中启动解决方案，请使用控制台导航栏中的区域选择器。
3. 在**创建堆栈**页面上，确认Amazon S3 URL文本框中显示正确的模板URL，然后选择**下一步**。
4. 在**指定堆栈详细信息**页面上，为您的解决方案堆栈分配一个账户内唯一且符合命名要求的名称。有关命名字符限制的信息，请参阅*Amazon Identity and Access Management用户指南*中的[IAM 和 STS 限制](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-limits.html)。
5. 在**参数**部分，查看此解决方案模板的参数并根据需要进行修改。

    | 参数名称 | 默认值 | 描述 |
    |----------|--------|--------|
    | **OidcProvider** | 无 |	OIDC应用程序配置中显示的颁发者。
    | **OidcClientId** | 无 |	OIDC应用配置中显示的App ID。
    | **OidcCustomerDomain** | 无 | 指在中国完成ICP注册的客户域，注意不是Authing提供的子域。<br> 它的开头必须是https://。

6. 选择**下一步**。
7. 在**配置堆栈选项** 页面上，保持默认值并选择**下一步**。
8. 在查看页面，查看并确认设置。选中确认模板将创建Amazon Identity and Access Management (IAM) 资源的框。
9. 选择**创建堆栈**以部署堆栈。

您可以在Amazon CloudFormation控制台的**状态**列中查看堆栈的状态。正常情况下，大约15分钟内可以看到状态为**CREATE_COMPLETE**。

## 步骤2：访问网页控制台 <a name="launch-web-console"></a>

在堆栈创建成功后，您可在Amazon CloudFormation的**输出**标签页中查看访问网页控制台需要的信息（**PortalUrl**）。

成功部署后，包含临时登录密码的电子邮件将发送到提供的电子邮件地址。

根据您启动堆栈的区域情况，您可以选择从中国区域或全球区域访问网页控制台。

- [选项1: 从全球区域使用Amazon Cognito用户池登录](#cognito)
- [选项2: 从中国区域使用OpenID身份验证登录](#openid)

### 选项1: 从全球区域使用Amazon Cognito用户池登录 <a name="cognito"></a>

1. 在浏览器的地址栏输入PortalURL，然后导航到Amazon Cognito控制台。
2. 使用AdminEmail和临时密码登录。
    1. 设置新的帐户密码。
    2. （可选）验证您的电子邮件地址以恢复帐户。
3. 验证完成后，系统将打开网页控制台。

### 选项2: 从中国区域使用OpenID身份验证登录 <a name="openid"></a>
1. 在浏览器的地址栏输入数据传输中心域名。
    - 如果您是第一次登录，系统会打开Authing.cn登录界面。
2. 输入您在部署解决方案时注册的用户名和密码，然后选择登录。系统将打开网页控制台。
3. 更改您的密码，然后重新登录。
## 步骤3：创建数据传输任务 <a name="create-task"></a>
您可以选择为Amazon S3或Amazon ECR创建传输任务。

![dth-console](./images/dth-console.png)

图1：网页控制台

### 创建Amazon S3传输任务
1. 从**创建传输任务**页面，选择**创建新任务**，然后选择**下一步**。
2. 在**引擎选项**页面的引擎下，选择**Amazon S3**，然后选择**下一步**。
3. 指定传输任务详细信息。
    - 在**源类型**下，选择数据源，例如Amazon S3。
4. 输入**存储桶名称**，并选择同步**整个存储桶**或**指定前缀的对象**或**多个指定前缀的对象**。
    - 如果数据源桶也在方案部署的账户中，请选择**Yes**。
        - 如果您需要实现实时的增量数据同步，请配置是否启用S3事件通知。注意，只有当该方案和您的数据源部署在同一个账户的同一个区域内时，方可配置该选项。
        - 如果您不启用S3事件通知，该方案会按照您在后续所配置的调度频率来定期实现增量数据的同步。
    - 如果数据源桶不在方案部署的账户中，请选择**No**，然后指定源存储桶的凭证。
    - 如果您选择同步多个前缀的对象，请将以换行为分隔的前缀列表文件传输到数据源桶的根目录下，然后填写该文件的名称。具体可参考[多前缀列表配置教程](https://github.com/awslabs/amazon-s3-data-replication-hub-plugin/blob/r2_1/docs/USING_PREFIX_LIST_CN.md)。
5. 要创建凭证信息，请选择[Secrets Manager](https://console.aws.amazon.com/secretsmanager/home)以跳转到当前区域的Amazon Secrets Manager控制台。
    - 从左侧菜单中，选择**密钥**，然后选择**储存新的密钥**并选择**其他类型的密钥**类型。
    - 根据显示格式在Plaintext输入框中填写`access_key_id`和`secret_access_key`信息。有关更多信息，请参阅*IAM用户指南*中的[IAM功能](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)。选择**下一步**。
    - （可选）输入密钥名称和描述。选择**下一步**。
    - 在自动轮换的配置中，选择禁用自动轮换。选择**下一步**。
    - 保留默认值，选择**保存**完成密钥的创建。
    - 返回任务创建界面并刷新界面，您的新密钥将显示在下拉列表中。
    - 选择证书（密钥）。

6. 设置目标端S3存储桶信息。

    !!! note "注意"

        如果源S3存储桶也在方案部署的账户中，则在目标端的设置中，您必须为目标端S3存储桶创建或提供凭证信息。否则，您不需要为目标端存储桶提供凭证信息。
    
7. 在**引擎设置**中，验证信息，并在必要时修改信息。如果要进行增量数据传输，建议将**最小容量**设置为至少为1的值。

8. 在**任务调度设置**处，选择您的任务调度配置。
    - 如果要以固定频率配置定时任务，以实现定时对比两侧的数据差异，请选择**Fixed Rate**。
    - 如果要通过[Cron Expression](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html#CronExpressions)配置定时任务，以实现定时对比两侧的数据差异，请选择**Cron Expression**。
    - 如果只想执行一次数据同步任务，请选择**One Time Transfer**。

9. 在**高级选项**中，保留默认值。
10. 在**是否需要数据比对**处，选择您的任务配置。
    - 如果要跳过数据对比过程，传输所有文件，请选择**No**。
    - 如果只想同步有差异的文件，请选择**Yes**。

11. 在**通知邮箱**中提供电子邮件地址。

12. 选择**下一步**并查看您的任务参数详细信息。

13. 选择**创建任务**。

任务创建成功后，会出现在**任务**页面。

![s3-task-list](./images/s3-task-list.png)

图2：任务页面

选择**任务 ID**进入任务详情页面，然后选择**CloudWatch Dashboard**监控任务状态。

### 创建Amazon ECR传输任务
1. 从**创建传输任务**页面，选择**创建新任务**，然后选择**下一步**。

2. 指定传输任务详细信息。在**源仓库类型**中，选择容器仓库类型。
3. 在**源仓库设置**中，输入**源仓库区域**和**Amazon Web Services账户ID**。
4. 要创建凭证信息，请选择[Secrets Manager](https://console.aws.amazon.com/secretsmanager/home)以跳转到当前区域的Amazon Secrets Manager控制台。

    1. 从左侧菜单中，选择**密钥**，然后选择**储存新的密钥**并选择**其他类型的密钥**类型。
    2. 根据显示格式在Plaintext输入框中填写`access_key_id`和`secret_access_key`信息。有关更多信息，请参阅*IAM用户指南*中的[IAM功能](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)。选择**下一步**。
    3. （可选）输入密钥名称和描述。选择**下一步**。
    4. 在自动轮换的配置中，选择禁用自动轮换。选择**下一步**。
    5. 保留默认值，选择**保存**完成密钥的创建。

5. 返回任务创建界面并刷新界面。您的新密钥将显示在下拉列表中。

6. 选择证书（密钥）。

    !!! note "注意"

        如果数据源也在方案部署的账户中，您必须为目标端创建或提供凭证信息。否则，您不需要为目标端提供凭证信息。

7. 在**通知邮箱**中提供电子邮件地址。

8. 选择**下一步**并查看您的任务参数详细信息。

9. 选择**创建任务**。

任务创建成功后，会出现在任务页面。