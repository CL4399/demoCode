package main

import (
	"database/sql"
	"fmt"
	"log"
	"test/config" // go mod 文件里面的 module 名称

	_ "github.com/go-sql-driver/mysql"

)

func main() {
	config.InitConfig()
	// fmt.Println(config.AppConfig.App.Name) // 输出配置文件信息
	// fmt.Println(config.AppConfig.Database) // 输出配置文件信息
	sqlFile()
}

type DatabaseConfig struct {
	User string
}

type AppConfig struct {
	Database DatabaseConfig
}

type Config struct {
	AppConfig AppConfig
}

func sqlFile() {
	fmt.Println(config.AppConfig.Database) // 输出配置文件信息
	var configSet = config.AppConfig.Database
	fmt.Println(configSet.User)

	dsn := fmt.Sprintf("%s:%s@tcp(%s%s)/%s", configSet.User, configSet.Password, configSet.Host, configSet.Port, configSet.Name) // admin:Safesail1324..@tcp(127.0.0.1:3306)/testProject

	fmt.Println(dsn)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// 测试连接
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	// // 插入数据
	// insertStmt := "INSERT INTO user (name, create_time) VALUES (?, ?)"
	// _, err = db.Exec(insertStmt, "John Doe", "2025-01-09 15:33:33")
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Println("Data inserted successfully")

	// 执行查询
	rows, err := db.Query("SELECT * FROM user")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// 获取列名
	columns, err := rows.Columns()
	if err != nil {
		log.Fatal(err)
	}

	// 遍历结果集
	for rows.Next() {
		// 创建一个切片来存储每一行的数据
		values := make([]interface{}, len(columns))
		valuePtrs := make([]interface{}, len(columns))
		for i := range columns {
			valuePtrs[i] = &values[i]
		}

		// 扫描每一行的数据到切片中
		err := rows.Scan(valuePtrs...)
		if err != nil {
			log.Fatal(err)
		}

		// 输出每一行的数据
		for i, col := range columns {
			val := values[i]
			b, ok := val.([]byte)
			if ok {
				fmt.Printf("%s: %s\n", col, string(b))
			} else {
				fmt.Printf("%s: %v\n", col, val)
			}
		}
		fmt.Println("-----------------------------------")
	}

	// 检查遍历过程中是否有错误
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
}
