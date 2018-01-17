const req = http.request({
            hostname: "目标服务器地址",
            port: "80",
            path: "请求路径",
            headers: {
                "x-y-z": "请求头"
            }
        },
        function(res) {
            // res 为响应对象
            console.log(res.statusCode)
        })
    // 如果有请求体需要发送，使用 write() 和 end()
req.end()