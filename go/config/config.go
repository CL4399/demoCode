package config

import (
	"log"

	"github.com/spf13/viper"
)

// 配置文件结构体
type Config struct {
	App struct {
		Name string
		Port string
	}
	Database struct {
		Host     string
		Port     string
		User     string
		Password string
		Name     string
	}
}

var AppConfig *Config

func InitConfig() {
	viper.SetConfigName("config")   // 设置配置文件名称
	viper.SetConfigType("yml")      // 设置配置文件类型
	viper.AddConfigPath("./config") // 设置配置文件路径
	// 读取配置文件
	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file: %v", err)
	}
	// 将配置文件内容解析到结构体中
	AppConfig = &Config{}

	// 解析配置文件(一次性加载所有文件到并解析到变量中，viper.Unmarshal)
	if err := viper.Unmarshal(AppConfig); err != nil {
		log.Fatalf("Unable to decode into struct: %v", err)
	}

	// sqlfile()

}
