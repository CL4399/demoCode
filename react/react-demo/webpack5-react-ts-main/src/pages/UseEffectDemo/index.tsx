import React, { useState, useEffect, useRef } from "react"
import { Button, Table, Input, Space } from "antd"
import axios from "axios"
import { SearchOutlined } from "@ant-design/icons"
import type { ColumnsType, ColumnType } from "antd/es/table"
function UseEffectDemo() {
    const [data, setData] = useState({ dataSource: [] as any[] })
    const [inputValue, setInputValue] = useState("")
    const [searchVal, setSearchVal] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`https://hn.algolia.com/api/v1/search?query=${inputValue}`)
            setData({
                dataSource: result.data.hits,
            })
        }
        fetchData()
    }, [searchVal])

    const setInput = (el: any) => {
        setInputValue(el.target.value)
        console.log(el.target.value, "setInput")
    }
    const setSearch = (type: number) => {
        if (type == 1) {
            setSearchVal(inputValue)
        } else {
            setInputValue("")
            setSearchVal("")
        }
        console.log(inputValue, "setSearch")
    }

    const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input onChange={setInput}></Input>
                <Space style={{ paddingTop: 8, display: "flex" }}>
                    <Button type="primary" size="small" onClick={() => setSearch(1)} style={{ width: 90 }}>
                        Search
                    </Button>
                    <Button onClick={() => setSearch(2)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    })
    const columns = [
        {
            title: "姓名",
            dataIndex: "title",
            key: "title",
            ...getColumnSearchProps("title"),
        },
        {
            title: "时间",
            dataIndex: "created_at",
            key: "created_at",
        },
        {
            title: "author",
            dataIndex: "author",
            key: "author",
        },
    ]

    return (
        <div>
            <Table style={{ width: "90%" }} rowKey="created_at_i" dataSource={data.dataSource} columns={columns} />
        </div>
    )
}

export default UseEffectDemo
