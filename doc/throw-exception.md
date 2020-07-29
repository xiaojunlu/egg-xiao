### 抛出异常

> throw new HttpException('UN_LOGIN');

### 返回信息例子

```

{
    "error": {
        "requestUrl": "GET : /api/users/19",
        "message": "未登陆，请登陆后操作",
        "code": 4040101
    }
}

```