package main

import (
	"fmt"
	"test/config" // go mod 文件里面的 module 名称
)

func main() {
	config.InitConfig()
	fmt.Println(config.AppConfig.App.Name) // 输出配置文件信息
}
