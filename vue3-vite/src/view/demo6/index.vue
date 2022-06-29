<template>
  <div class="role-content">
    <RoleAuthority :checkedKeys="checkedKeys" :data="treeData" :treeObj="treeObj"></RoleAuthority>
    <Button @click="clickOne">确定</Button>
  </div>
</template>
<script lang="ts">
import {
  reactive,
  ref,
  toRefs,
  provide,
  defineComponent,
  onMounted,
} from "vue";
import { useRouter } from "vue-router";
import RoleAuthority from "./role_authority.vue";
import { Input, Button } from "ant-design-vue"
export default defineComponent({
  components: { RoleAuthority, Input, Button },
  setup(props: any, { emit }: any) {
    let dataInfo = reactive({
      checkedKeys: [] as string[],
      treeData: [
        {
          id: 1,
          pid: 0,
          name: "顶级权限",
          checked: 0,
          children: [
            {
              id: 2,
              pid: 1,
              name: "资产管理",
              checked: 0,
              children: [
                {
                  id: 3,
                  pid: 2,
                  name: "资产列表",
                  checked: 0,
                  children: [
                    {
                      id: 33,
                      pid: 3,
                      name: "资产详细信息",
                      checked: 0,
                    },
                    {
                      id: 34,
                      pid: 3,
                      name: "资产信息添加",
                      checked: 0,
                    },
                    {
                      id: 35,
                      pid: 3,
                      name: "资产信息修改",
                      checked: 0,
                    },
                    {
                      id: 36,
                      pid: 3,
                      name: "资产信息删除",
                      checked: 0,
                    },
                  ],
                },
                {
                  id: 4,
                  pid: 2,
                  name: "资产位置",
                  checked: 0,
                  children: [
                    {
                      id: 37,
                      pid: 4,
                      name: "资产位置详情",
                      checked: 0,
                    },
                    {
                      id: 38,
                      pid: 4,
                      name: "资产位置添加",
                      checked: 0,
                    },
                    {
                      id: 39,
                      pid: 4,
                      name: "资产位置修改",
                      checked: 0,
                    },
                    {
                      id: 40,
                      pid: 4,
                      name: "资产位置删除",
                      checked: 0,
                    },
                  ],
                },
                {
                  id: 41,
                  pid: 2,
                  name: "业务系统列表",
                  checked: 0,
                  children: [
                    {
                      id: 42,
                      pid: 41,
                      name: "业务系统详情",
                      checked: 0,
                    },
                    {
                      id: 43,
                      pid: 41,
                      name: "业务系统添加",
                      checked: 0,
                    },
                    {
                      id: 44,
                      pid: 41,
                      name: "业务系统修改",
                      checked: 0,
                    },
                    {
                      id: 45,
                      pid: 41,
                      name: "业务系统删除",
                      checked: 0,
                    },
                  ],
                },
                {
                  id: 88,
                  pid: 2,
                  name: "下载客户端安装包",
                  checked: 0,
                },
                {
                  id: 93,
                  pid: 2,
                  name: "绑定主机",
                  checked: 0,
                },
                {
                  id: 94,
                  pid: 2,
                  name: "主机解绑",
                  checked: 0,
                },
                {
                  id: 95,
                  pid: 2,
                  name: "业务系统筛选",
                  checked: 0,
                },
                {
                  id: 96,
                  pid: 2,
                  name: "资产位置筛选",
                  checked: 0,
                },
                {
                  id: 97,
                  pid: 2,
                  name: "组信息筛选",
                  checked: 0,
                },
                {
                  id: 98,
                  pid: 2,
                  name: "主机信息筛选",
                  checked: 0,
                },
                {
                  id: 315,
                  pid: 2,
                  name: "责任人列表",
                  checked: 0,
                  children: [
                    {
                      id: 316,
                      pid: 315,
                      name: "责任人详情",
                      checked: 0,
                    },
                    {
                      id: 317,
                      pid: 315,
                      name: "责任人添加",
                      checked: 0,
                    },
                    {
                      id: 318,
                      pid: 315,
                      name: "责任人修改",
                      checked: 0,
                    },
                    {
                      id: 319,
                      pid: 315,
                      name: "责任人删除",
                      checked: 0,
                    },
                  ],
                },
                {
                  id: 320,
                  pid: 2,
                  name: "责任人筛选",
                  checked: 0,
                },
              ],
            },
            {
              id: 6,
              pid: 1,
              name: "平台管理",
              checked: 0,
              children: [
                {
                  id: 7,
                  pid: 6,
                  name: "用户管理",
                  checked: 0,
                  children: [
                    {
                      id: 11,
                      pid: 7,
                      name: "用户列表",
                      checked: 0,
                    },
                    {
                      id: 12,
                      pid: 7,
                      name: "用户详情",
                      checked: 0,
                    },
                    {
                      id: 13,
                      pid: 7,
                      name: "修改用户信息",
                      checked: 0,
                    },
                    {
                      id: 14,
                      pid: 7,
                      name: "删除用户信息",
                      checked: 0,
                    },
                    {
                      id: 15,
                      pid: 7,
                      name: "重置其他用户密码",
                      checked: 0,
                    },
                    {
                      id: 17,
                      pid: 7,
                      name: "重置用户登录状态",
                      checked: 0,
                    },
                    {
                      id: 89,
                      pid: 7,
                      name: "组筛选信息",
                      checked: 0,
                    },
                    {
                      id: 90,
                      pid: 7,
                      name: "角色筛选信息",
                      checked: 0,
                    },
                  ],
                },
                {
                  id: 8,
                  pid: 6,
                  name: "资产组管理",
                  checked: 0,
                  children: [
                    {
                      id: 9,
                      pid: 8,
                      name: "添加用户信息",
                      checked: 0,
                    },
                    {
                      id: 18,
                      pid: 8,
                      name: "资产组列表",
                      checked: 0,
                    },
                    {
                      id: 19,
                      pid: 8,
                      name: "资产组详情",
                      checked: 0,
                    },
                    {
                      id: 20,
                      pid: 8,
                      name: "添加资产组信息",
                      checked: 0,
                    },
                    {
                      id: 21,
                      pid: 8,
                      name: "修改资产组信息",
                      checked: 0,
                    },
                    {
                      id: 22,
                      pid: 8,
                      name: "删除资产组信息",
                      checked: 0,
                    },
                    {
                      id: 23,
                      pid: 8,
                      name: "重置资产组登录状态",
                      checked: 0,
                    },
                    {
                      id: 83,
                      pid: 8,
                      name: "资产组授权",
                      checked: 0,
                    },
                    {
                      id: 91,
                      pid: 8,
                      name: "资产组所属角色列表",
                      checked: 0,
                    },
                    {
                      id: 92,
                      pid: 8,
                      name: "资产组所属角色修改",
                      checked: 0,
                    },
                  ],
                },
                {
                  id: 10,
                  pid: 6,
                  name: "角色管理",
                  checked: 0,
                  children: [
                    {
                      id: 24,
                      pid: 10,
                      name: "角色列表",
                      checked: 0,
                    },
                    {
                      id: 25,
                      pid: 10,
                      name: "角色详情",
                      checked: 0,
                    },
                    {
                      id: 26,
                      pid: 10,
                      name: "添加角色信息",
                      checked: 0,
                    },
                    {
                      id: 27,
                      pid: 10,
                      name: "修改角色信息",
                      checked: 0,
                    },
                    {
                      id: 28,
                      pid: 10,
                      name: "删除角色信息",
                      checked: 0,
                    },
                    {
                      id: 29,
                      pid: 10,
                      name: "重置角色登录状态",
                      checked: 0,
                    },
                    {
                      id: 30,
                      pid: 10,
                      name: "查看角色拥有权限",
                      checked: 0,
                    },
                    {
                      id: 31,
                      pid: 10,
                      name: "修改角色拥有权限",
                      checked: 0,
                    },
                  ],
                },
                {
                  id: 46,
                  pid: 6,
                  name: "访问IP白名单",
                  checked: 0,
                  children: [
                    {
                      id: 47,
                      pid: 46,
                      name: "访问IP详情",
                      checked: 0,
                    },
                    {
                      id: 48,
                      pid: 46,
                      name: "访问IP添加",
                      checked: 0,
                    },
                    {
                      id: 49,
                      pid: 46,
                      name: "访问IP修改",
                      checked: 0,
                    },
                    {
                      id: 50,
                      pid: 46,
                      name: "访问IP删除",
                      checked: 0,
                    },
                    {
                      id: 51,
                      pid: 46,
                      name: "开启自动添加访问IP",
                      checked: 0,
                    },
                    {
                      id: 52,
                      pid: 46,
                      name: "获取自动添加访问IP信息",
                      checked: 0,
                    },
                  ],
                },
                {
                  id: 53,
                  pid: 6,
                  name: "授权管理列表",
                  checked: 0,
                  children: [
                    {
                      id: 54,
                      pid: 53,
                      name: "在线授权",
                      checked: 0,
                    },
                    {
                      id: 55,
                      pid: 53,
                      name: "离线授权",
                      checked: 0,
                    },
                    {
                      id: 99,
                      pid: 53,
                      name: "下载主机码",
                      checked: 0,
                    },
                  ],
                },
                {
                  id: 56,
                  pid: 6,
                  name: "产品更新",
                  checked: 0,
                  children: [
                    {
                      id: 57,
                      pid: 56,
                      name: "在线更新",
                      checked: 0,
                    },
                    {
                      id: 58,
                      pid: 56,
                      name: "离线更新",
                      checked: 0,
                    },
                  ],
                },
                {
                  id: 87,
                  pid: 6,
                  name: "配置",
                  checked: 0,
                },
                {
                  id: 310,
                  pid: 6,
                  name: "数据管理",
                  checked: 0,
                  children: [
                    {
                      id: 311,
                      pid: 310,
                      name: "数据备份",
                      checked: 0,
                    },
                    {
                      id: 312,
                      pid: 310,
                      name: "数据还原",
                      checked: 0,
                    },
                    {
                      id: 313,
                      pid: 310,
                      name: "清空备份",
                      checked: 0,
                    },
                  ],
                },
              ],
            },
            {
              id: 59,
              pid: 1,
              name: "产品管理",
              checked: 0,
              children: [
                {
                  id: 60,
                  pid: 59,
                  name: "网络防御",
                  checked: 0,
                  children: [
                    {
                      id: 62,
                      pid: 60,
                      name: "管理",
                      checked: 0,
                      children: [
                        {
                          id: 254,
                          pid: 62,
                          name: "网络防御功能开关",
                          checked: 0,
                          children: [
                            {
                              id: 255,
                              pid: 254,
                              name: "获取网络防御功能开关信息",
                              checked: 0,
                            },
                            {
                              id: 256,
                              pid: 254,
                              name: "修改网络防御功能开关信息",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 257,
                          pid: 62,
                          name: "网络防御清空黑名单",
                          checked: 0,
                        },
                        {
                          id: 258,
                          pid: 62,
                          name: "网络防御官方策略组",
                          checked: 0,
                          children: [
                            {
                              id: 259,
                              pid: 258,
                              name: "网络防御官方策略组列表",
                              checked: 0,
                            },
                            {
                              id: 260,
                              pid: 258,
                              name: "启用网络防御官方策略组",
                              checked: 0,
                            },
                            {
                              id: 261,
                              pid: 258,
                              name: "禁用网络防御官方策略组",
                              checked: 0,
                            },
                            {
                              id: 262,
                              pid: 258,
                              name: "网络防御官方策略组配置",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 263,
                          pid: 62,
                          name: "网络防御官方策略",
                          checked: 0,
                          children: [
                            {
                              id: 264,
                              pid: 263,
                              name: "网络防御官方策略列表",
                              checked: 0,
                            },
                            {
                              id: 265,
                              pid: 263,
                              name: "启用网络防御官方策略",
                              checked: 0,
                            },
                            {
                              id: 266,
                              pid: 263,
                              name: "禁用网络防御官方策略",
                              checked: 0,
                            },
                            {
                              id: 267,
                              pid: 263,
                              name: "网络防御官方策略配置",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 268,
                          pid: 62,
                          name: "网络防御自定义策略",
                          checked: 0,
                          children: [
                            {
                              id: 269,
                              pid: 268,
                              name: "网络防御自定义策略列表",
                              checked: 0,
                            },
                            {
                              id: 270,
                              pid: 268,
                              name: "网络防御自定义策略类型列表",
                              checked: 0,
                            },
                            {
                              id: 271,
                              pid: 268,
                              name: "添加网络防御自定义策略",
                              checked: 0,
                            },
                            {
                              id: 272,
                              pid: 268,
                              name: "修改网络防御自定义策略",
                              checked: 0,
                            },
                            {
                              id: 273,
                              pid: 268,
                              name: "删除网络防御自定义策略",
                              checked: 0,
                            },
                            {
                              id: 274,
                              pid: 268,
                              name: "启用网络防御自定义策略",
                              checked: 0,
                            },
                            {
                              id: 275,
                              pid: 268,
                              name: "禁用网络防御自定义策略",
                              checked: 0,
                            },
                            {
                              id: 276,
                              pid: 268,
                              name: "清空网络防御自定义策略",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 277,
                          pid: 62,
                          name: "网络防御操作系统防火墙规则",
                          checked: 0,
                          children: [
                            {
                              id: 278,
                              pid: 277,
                              name: "网络防御操作系统防火墙规则列表",
                              checked: 0,
                            },
                            {
                              id: 279,
                              pid: 277,
                              name: "网络防御操作系统防火墙规则开启监控",
                              checked: 0,
                            },
                            {
                              id: 280,
                              pid: 277,
                              name: "网络防御操作系统防火墙规则关闭监控",
                              checked: 0,
                            },
                            {
                              id: 281,
                              pid: 277,
                              name: "删除网络防御操作系统防火墙规则",
                              checked: 0,
                            },
                            {
                              id: 282,
                              pid: 277,
                              name: "网络防御操作系统防火墙规则模式切换",
                              checked: 0,
                            },
                            {
                              id: 283,
                              pid: 277,
                              name: "获取网络防御操作系统防火墙规则模式",
                              checked: 0,
                            },
                            {
                              id: 284,
                              pid: 277,
                              name: "网络防御上传客户端规则",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 285,
                          pid: 62,
                          name: "网络防御日志详情",
                          checked: 0,
                          children: [
                            {
                              id: 286,
                              pid: 285,
                              name: "网络防御日志列表",
                              checked: 0,
                            },
                            {
                              id: 287,
                              pid: 285,
                              name: "网络防御下载数据包",
                              checked: 0,
                            },
                            {
                              id: 288,
                              pid: 285,
                              name: "删除网络防御日志",
                              checked: 0,
                            },
                            {
                              id: 289,
                              pid: 285,
                              name: "清空网络防御日志",
                              checked: 0,
                            },
                            {
                              id: 290,
                              pid: 285,
                              name: "网络防御日志启用规则",
                              checked: 0,
                            },
                            {
                              id: 291,
                              pid: 285,
                              name: "网络防御日志停用规则",
                              checked: 0,
                            },
                            {
                              id: 292,
                              pid: 285,
                              name: "网络防御日志创建IP白名单规则",
                              checked: 0,
                            },
                            {
                              id: 293,
                              pid: 285,
                              name: "网络防御日志停用IP白名单规则",
                              checked: 0,
                            },
                            {
                              id: 294,
                              pid: 285,
                              name: "网络防御日志启用IP白名单规则",
                              checked: 0,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 63,
                      pid: 60,
                      name: "统计",
                      checked: 0,
                      children: [
                        {
                          id: 295,
                          pid: 63,
                          name: "网络防御今日统计",
                          checked: 0,
                          children: [
                            {
                              id: 296,
                              pid: 295,
                              name: "网络防御今日统计攻击数",
                              checked: 0,
                            },
                            {
                              id: 297,
                              pid: 295,
                              name: "网络防御今日统计风险等级",
                              checked: 0,
                            },
                            {
                              id: 298,
                              pid: 295,
                              name: "网络防御今日统计资产排行",
                              checked: 0,
                            },
                            {
                              id: 299,
                              pid: 295,
                              name: "网络防御今日统计攻击来源排行",
                              checked: 0,
                            },
                            {
                              id: 300,
                              pid: 295,
                              name: "网络防御今日统计攻击类型排行",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 301,
                          pid: 63,
                          name: "网络防御统计资产攻击趋势",
                          checked: 0,
                        },
                        {
                          id: 302,
                          pid: 63,
                          name: "网络防御统计最近日志",
                          checked: 0,
                        },
                        {
                          id: 303,
                          pid: 63,
                          name: "网络防御总统计",
                          checked: 0,
                          children: [
                            {
                              id: 304,
                              pid: 303,
                              name: "网络防御总统计攻击数",
                              checked: 0,
                            },
                            {
                              id: 305,
                              pid: 303,
                              name: "网络防御总统计风险等级",
                              checked: 0,
                            },
                            {
                              id: 306,
                              pid: 303,
                              name: "网络防御总统计资产排行",
                              checked: 0,
                            },
                            {
                              id: 307,
                              pid: 303,
                              name: "网络防御总统计攻击来源",
                              checked: 0,
                            },
                            {
                              id: 308,
                              pid: 303,
                              name: "网络防御总统计攻击类型",
                              checked: 0,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 61,
                  pid: 59,
                  name: "文件防御",
                  checked: 0,
                  children: [
                    {
                      id: 64,
                      pid: 61,
                      name: "管理",
                      checked: 0,
                      children: [
                        {
                          id: 106,
                          pid: 64,
                          name: "文件防御功能开关",
                          checked: 0,
                          children: [
                            {
                              id: 107,
                              pid: 106,
                              name: "查询文件防御功能开关信息",
                              checked: 0,
                            },
                            {
                              id: 108,
                              pid: 106,
                              name: "保存文件防御功能开关信息",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 109,
                          pid: 64,
                          name: "文件查杀",
                          checked: 0,
                          children: [
                            {
                              id: 110,
                              pid: 109,
                              name: "开始文件查杀",
                              checked: 0,
                            },
                            {
                              id: 111,
                              pid: 109,
                              name: "停止文件查杀",
                              checked: 0,
                            },
                            {
                              id: 112,
                              pid: 109,
                              name: "暂停文件查杀",
                              checked: 0,
                            },
                            {
                              id: 113,
                              pid: 109,
                              name: "继续文件查杀",
                              checked: 0,
                            },
                            {
                              id: 114,
                              pid: 109,
                              name: "文件查杀进度条",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 115,
                          pid: 64,
                          name: "文件防御排除策略",
                          checked: 0,
                          children: [
                            {
                              id: 116,
                              pid: 115,
                              name: "文件防御排除策略列表",
                              checked: 0,
                            },
                            {
                              id: 117,
                              pid: 115,
                              name: "文件防御排除策略详情",
                              checked: 0,
                            },
                            {
                              id: 118,
                              pid: 115,
                              name: "添加文件防御排除策略",
                              checked: 0,
                            },
                            {
                              id: 119,
                              pid: 115,
                              name: "修改文件防御排除策略",
                              checked: 0,
                            },
                            {
                              id: 120,
                              pid: 115,
                              name: "删除文件防御排除策略",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 121,
                          pid: 64,
                          name: "文件防御日志详情",
                          checked: 0,
                          children: [
                            {
                              id: 122,
                              pid: 121,
                              name: "文件防御日志列表",
                              checked: 0,
                            },
                            {
                              id: 123,
                              pid: 121,
                              name: "文件恢复",
                              checked: 0,
                            },
                            {
                              id: 124,
                              pid: 121,
                              name: "文件防御源文件下载",
                              checked: 0,
                            },
                            {
                              id: 125,
                              pid: 121,
                              name: "删除文件防御日志",
                              checked: 0,
                            },
                            {
                              id: 126,
                              pid: 121,
                              name: "清空文件防御日志",
                              checked: 0,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 65,
                      pid: 61,
                      name: "统计",
                      checked: 0,
                      children: [
                        {
                          id: 127,
                          pid: 65,
                          name: "文件防御资产统计",
                          checked: 0,
                        },
                        {
                          id: 128,
                          pid: 65,
                          name: "文件防御周期统计",
                          checked: 0,
                        },
                        {
                          id: 129,
                          pid: 65,
                          name: "文件防御总统计",
                          checked: 0,
                        },
                        {
                          id: 130,
                          pid: 65,
                          name: "文件防御最近日志列表",
                          checked: 0,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 66,
                  pid: 59,
                  name: "防篡改",
                  checked: 0,
                  children: [
                    {
                      id: 67,
                      pid: 66,
                      name: "管理",
                      checked: 0,
                      children: [
                        {
                          id: 231,
                          pid: 67,
                          name: "防篡改功能开关",
                          checked: 0,
                          children: [
                            {
                              id: 232,
                              pid: 231,
                              name: "获取防篡改功能开关信息",
                              checked: 0,
                            },
                            {
                              id: 233,
                              pid: 231,
                              name: "修改防篡改功能开关信息",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 234,
                          pid: 67,
                          name: "防篡改保护策略",
                          checked: 0,
                          children: [
                            {
                              id: 235,
                              pid: 234,
                              name: "防篡改保护策略列表",
                              checked: 0,
                            },
                            {
                              id: 236,
                              pid: 234,
                              name: "防篡改保护策略详情",
                              checked: 0,
                            },
                            {
                              id: 237,
                              pid: 234,
                              name: "添加防篡改保护策略",
                              checked: 0,
                            },
                            {
                              id: 238,
                              pid: 234,
                              name: "修改防篡改保护策略",
                              checked: 0,
                            },
                            {
                              id: 239,
                              pid: 234,
                              name: "删除防篡改保护策略",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 240,
                          pid: 67,
                          name: "防篡改排除策略",
                          checked: 0,
                          children: [
                            {
                              id: 241,
                              pid: 240,
                              name: "防篡改排除策略列表",
                              checked: 0,
                            },
                            {
                              id: 242,
                              pid: 240,
                              name: "防篡改排除策略详情",
                              checked: 0,
                            },
                            {
                              id: 243,
                              pid: 240,
                              name: "添加防篡改排除策略",
                              checked: 0,
                            },
                            {
                              id: 244,
                              pid: 240,
                              name: "修改防篡改排除策略",
                              checked: 0,
                            },
                            {
                              id: 245,
                              pid: 240,
                              name: "删除防篡改排除策略",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 246,
                          pid: 67,
                          name: "防篡改日志详情",
                          checked: 0,
                          children: [
                            {
                              id: 247,
                              pid: 246,
                              name: "防篡改日志列表",
                              checked: 0,
                            },
                            {
                              id: 248,
                              pid: 246,
                              name: "删除防篡改日志",
                              checked: 0,
                            },
                            {
                              id: 249,
                              pid: 246,
                              name: "清空防篡改日志",
                              checked: 0,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 68,
                      pid: 66,
                      name: "统计",
                      checked: 0,
                      children: [
                        {
                          id: 250,
                          pid: 68,
                          name: "防篡改今日统计",
                          checked: 0,
                        },
                        {
                          id: 251,
                          pid: 68,
                          name: "防篡改周期统计",
                          checked: 0,
                        },
                        {
                          id: 252,
                          pid: 68,
                          name: "防篡改总统计",
                          checked: 0,
                        },
                        {
                          id: 253,
                          pid: 68,
                          name: "防篡改最近日志列表",
                          checked: 0,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 69,
                  pid: 59,
                  name: "防勒索",
                  checked: 0,
                  children: [
                    {
                      id: 70,
                      pid: 69,
                      name: "管理",
                      checked: 0,
                      children: [
                        {
                          id: 131,
                          pid: 70,
                          name: "防勒索功能开关",
                          checked: 0,
                          children: [
                            {
                              id: 132,
                              pid: 131,
                              name: "修改防勒索功能开关信息",
                              checked: 0,
                            },
                            {
                              id: 133,
                              pid: 131,
                              name: "查看防勒索功能开关信息",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 134,
                          pid: 70,
                          name: "防勒索日志详情",
                          checked: 0,
                          children: [
                            {
                              id: 135,
                              pid: 134,
                              name: "防勒索日志列表",
                              checked: 0,
                            },
                            {
                              id: 136,
                              pid: 134,
                              name: "删除防勒索日志",
                              checked: 0,
                            },
                            {
                              id: 137,
                              pid: 134,
                              name: "清空防勒索日志",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 138,
                          pid: 70,
                          name: "防勒索策略",
                          checked: 0,
                          children: [
                            {
                              id: 139,
                              pid: 138,
                              name: "防勒索策略列表",
                              checked: 0,
                            },
                            {
                              id: 140,
                              pid: 138,
                              name: "防勒索策略详情",
                              checked: 0,
                            },
                            {
                              id: 141,
                              pid: 138,
                              name: "添加防勒索策略",
                              checked: 0,
                            },
                            {
                              id: 142,
                              pid: 138,
                              name: "修改防勒索策略",
                              checked: 0,
                            },
                            {
                              id: 143,
                              pid: 138,
                              name: "删除防勒索策略",
                              checked: 0,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 71,
                      pid: 69,
                      name: "统计",
                      checked: 0,
                      children: [
                        {
                          id: 144,
                          pid: 71,
                          name: "防勒索今日统计",
                          checked: 0,
                        },
                        {
                          id: 145,
                          pid: 71,
                          name: "防勒索周期统计",
                          checked: 0,
                        },
                        {
                          id: 146,
                          pid: 71,
                          name: "防勒索总统计",
                          checked: 0,
                        },
                        {
                          id: 147,
                          pid: 71,
                          name: "防勒索最近日志列表",
                          checked: 0,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 72,
                  pid: 59,
                  name: "内核加固",
                  checked: 0,
                  children: [
                    {
                      id: 73,
                      pid: 72,
                      name: "管理",
                      checked: 0,
                      children: [
                        {
                          id: 148,
                          pid: 73,
                          name: "内核加固功能开关",
                          checked: 0,
                          children: [
                            {
                              id: 149,
                              pid: 148,
                              name: "查看内核加固功能开关信息",
                              checked: 0,
                            },
                            {
                              id: 150,
                              pid: 148,
                              name: "修改内核加固功能开关信息",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 151,
                          pid: 73,
                          name: "内核加固规则组",
                          checked: 0,
                          children: [
                            {
                              id: 152,
                              pid: 151,
                              name: "内核加固规则组列表",
                              checked: 0,
                            },
                            {
                              id: 153,
                              pid: 151,
                              name: "添加内核加固规则组",
                              checked: 0,
                            },
                            {
                              id: 154,
                              pid: 151,
                              name: "修改内核加固规则组",
                              checked: 0,
                            },
                            {
                              id: 155,
                              pid: 151,
                              name: "删除内核加固规则组",
                              checked: 0,
                            },
                            {
                              id: 156,
                              pid: 151,
                              name: "开启内核加固规则组",
                              checked: 0,
                            },
                            {
                              id: 157,
                              pid: 151,
                              name: "关闭内核加固规则组",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 158,
                          pid: 73,
                          name: "内核加固规则",
                          checked: 0,
                          children: [
                            {
                              id: 159,
                              pid: 158,
                              name: "内核加固规则列表",
                              checked: 0,
                            },
                            {
                              id: 160,
                              pid: 158,
                              name: "添加内核加固规则",
                              checked: 0,
                            },
                            {
                              id: 161,
                              pid: 158,
                              name: "内核加固规则详情",
                              checked: 0,
                            },
                            {
                              id: 162,
                              pid: 158,
                              name: "修改内核加固规则",
                              checked: 0,
                            },
                            {
                              id: 163,
                              pid: 158,
                              name: "删除内核加固规则",
                              checked: 0,
                            },
                            {
                              id: 164,
                              pid: 158,
                              name: "开启内核加固规则",
                              checked: 0,
                            },
                            {
                              id: 165,
                              pid: 158,
                              name: "关闭内核加固规则",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 166,
                          pid: 73,
                          name: "内核加固白名单",
                          checked: 0,
                          children: [
                            {
                              id: 167,
                              pid: 166,
                              name: "内核加固白名单列表",
                              checked: 0,
                            },
                            {
                              id: 168,
                              pid: 166,
                              name: "添加内核加固白名单",
                              checked: 0,
                            },
                            {
                              id: 169,
                              pid: 166,
                              name: "内核加固白名单详情",
                              checked: 0,
                            },
                            {
                              id: 170,
                              pid: 166,
                              name: "修改内核加固白名单",
                              checked: 0,
                            },
                            {
                              id: 171,
                              pid: 166,
                              name: "删除内核加固白名单",
                              checked: 0,
                            },
                            {
                              id: 172,
                              pid: 166,
                              name: "开启内核加固白名单",
                              checked: 0,
                            },
                            {
                              id: 173,
                              pid: 166,
                              name: "关闭内核加固白名单",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 174,
                          pid: 73,
                          name: "内核加固日志详情",
                          checked: 0,
                          children: [
                            {
                              id: 175,
                              pid: 174,
                              name: "内核加固日志列表",
                              checked: 0,
                            },
                            {
                              id: 176,
                              pid: 174,
                              name: "删除内核加固日志",
                              checked: 0,
                            },
                            {
                              id: 177,
                              pid: 174,
                              name: "清空内核加固日志",
                              checked: 0,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 74,
                      pid: 72,
                      name: "统计",
                      checked: 0,
                      children: [
                        {
                          id: 178,
                          pid: 74,
                          name: "内核加固今日统计",
                          checked: 0,
                          children: [
                            {
                              id: 179,
                              pid: 178,
                              name: "内核加固今日统计攻击次数",
                              checked: 0,
                            },
                            {
                              id: 180,
                              pid: 178,
                              name: "内核加固今日统计处理方式",
                              checked: 0,
                            },
                            {
                              id: 181,
                              pid: 178,
                              name: "内核加固今日统计资产排行",
                              checked: 0,
                            },
                            {
                              id: 182,
                              pid: 178,
                              name: "内核加固今日统计时间分布",
                              checked: 0,
                            },
                            {
                              id: 183,
                              pid: 178,
                              name: "内核加固今日统计规则分布",
                              checked: 0,
                            },
                            {
                              id: 184,
                              pid: 178,
                              name: "内核加固今日统计最新日志列表",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 185,
                          pid: 74,
                          name: "内核加固总统计",
                          checked: 0,
                          children: [
                            {
                              id: 186,
                              pid: 185,
                              name: "内核加固总统计攻击次数",
                              checked: 0,
                            },
                            {
                              id: 187,
                              pid: 185,
                              name: "内核加固总统计处理方式",
                              checked: 0,
                            },
                            {
                              id: 188,
                              pid: 185,
                              name: "内核加固总统计资产排行",
                              checked: 0,
                            },
                            {
                              id: 189,
                              pid: 185,
                              name: "内核加固总统计时间分布",
                              checked: 0,
                            },
                            {
                              id: 190,
                              pid: 185,
                              name: "内核加固总统计规则分布",
                              checked: 0,
                            },
                            {
                              id: 191,
                              pid: 185,
                              name: "内核加固总统计攻击趋势",
                              checked: 0,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 76,
                  pid: 59,
                  name: "微隔离",
                  checked: 0,
                  children: [
                    {
                      id: 77,
                      pid: 76,
                      name: "管理",
                      checked: 0,
                      children: [
                        {
                          id: 192,
                          pid: 77,
                          name: "微隔离功能开关",
                          checked: 0,
                          children: [
                            {
                              id: 193,
                              pid: 192,
                              name: "修改微隔离功能开关信息",
                              checked: 0,
                            },
                            {
                              id: 194,
                              pid: 192,
                              name: "查看微隔离功能开关信息",
                              checked: 0,
                            },
                            {
                              id: 195,
                              pid: 192,
                              name: "微隔离规则重置",
                              checked: 0,
                            },
                            {
                              id: 196,
                              pid: 192,
                              name: "微隔离内网ip",
                              checked: 0,
                              children: [
                                {
                                  id: 197,
                                  pid: 196,
                                  name: "微隔离内网ip排除列表",
                                  checked: 0,
                                },
                                {
                                  id: 198,
                                  pid: 196,
                                  name: "微隔离内网ip排除详情",
                                  checked: 0,
                                },
                                {
                                  id: 199,
                                  pid: 196,
                                  name: "微隔离内网ip排除添加",
                                  checked: 0,
                                },
                                {
                                  id: 200,
                                  pid: 196,
                                  name: "微隔离内网ip排除修改",
                                  checked: 0,
                                },
                                {
                                  id: 201,
                                  pid: 196,
                                  name: "微隔离内网ip排除删除",
                                  checked: 0,
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 202,
                          pid: 77,
                          name: "微隔离学习配置",
                          checked: 0,
                          children: [
                            {
                              id: 203,
                              pid: 202,
                              name: "获取微隔离学习配置",
                              checked: 0,
                            },
                            {
                              id: 204,
                              pid: 202,
                              name: "修改微隔离学习配置",
                              checked: 0,
                            },
                            {
                              id: 205,
                              pid: 202,
                              name: "微隔离开始学习",
                              checked: 0,
                            },
                            {
                              id: 206,
                              pid: 202,
                              name: "微隔离学习统计图模式",
                              checked: 0,
                            },
                            {
                              id: 207,
                              pid: 202,
                              name: "微隔离学习统计表格模式",
                              checked: 0,
                            },
                            {
                              id: 314,
                              pid: 202,
                              name: "微隔离停止学习",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 208,
                          pid: 77,
                          name: "微隔离策略",
                          checked: 0,
                          children: [
                            {
                              id: 209,
                              pid: 208,
                              name: "微隔离策略排除列表",
                              checked: 0,
                            },
                            {
                              id: 210,
                              pid: 208,
                              name: "微隔离策略排除详情",
                              checked: 0,
                            },
                            {
                              id: 211,
                              pid: 208,
                              name: "微隔离策略排除添加",
                              checked: 0,
                            },
                            {
                              id: 212,
                              pid: 208,
                              name: "微隔离策略排除修改",
                              checked: 0,
                            },
                            {
                              id: 213,
                              pid: 208,
                              name: "微隔离策略排除删除",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 321,
                          pid: 77,
                          name: "微隔离一键生成策略相关",
                          checked: 0,
                          children: [
                            {
                              id: 322,
                              pid: 321,
                              name: "本次学习到的规则",
                              checked: 0,
                              children: [
                                {
                                  id: 323,
                                  pid: 322,
                                  name: "本次学习到的出站规则",
                                  checked: 0,
                                },
                                {
                                  id: 324,
                                  pid: 322,
                                  name: "本次学习到的入站规则",
                                  checked: 0,
                                },
                              ],
                            },
                            {
                              id: 325,
                              pid: 321,
                              name: "微隔离预备学习规则",
                              checked: 0,
                              children: [
                                {
                                  id: 326,
                                  pid: 325,
                                  name: "微隔离生成预备学习规则",
                                  checked: 0,
                                },
                                {
                                  id: 327,
                                  pid: 325,
                                  name: "微隔离查询生成预备学习规则的结果",
                                  checked: 0,
                                },
                                {
                                  id: 328,
                                  pid: 325,
                                  name: "微隔离预备学习规则管理",
                                  checked: 0,
                                  children: [
                                    {
                                      id: 329,
                                      pid: 328,
                                      name: "微隔离预备学习规则列表",
                                      checked: 0,
                                    },
                                    {
                                      id: 330,
                                      pid: 328,
                                      name: "微隔离预备学习规则详情",
                                      checked: 0,
                                    },
                                    {
                                      id: 331,
                                      pid: 328,
                                      name: "删除微隔离预备学习规则",
                                      checked: 0,
                                    },
                                    {
                                      id: 332,
                                      pid: 328,
                                      name: "修改微隔离预备学习规则",
                                      checked: 0,
                                    },
                                    {
                                      id: 333,
                                      pid: 328,
                                      name:
                                        "微隔离将预备学习规则下发为正式规则",
                                      checked: 0,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 80,
                  pid: 59,
                  name: "风险发现",
                  checked: 0,
                  children: [
                    {
                      id: 81,
                      pid: 80,
                      name: "弱口令",
                      checked: 0,
                      children: [
                        {
                          id: 214,
                          pid: 81,
                          name: "风险发现资产列表",
                          checked: 0,
                          children: [
                            {
                              id: 215,
                              pid: 214,
                              name: "风险发现非活跃资产列表",
                              checked: 0,
                            },
                            {
                              id: 216,
                              pid: 214,
                              name: "风险发现活跃资产列表",
                              checked: 0,
                            },
                            {
                              id: 217,
                              pid: 214,
                              name: "风险发现扫描资产",
                              checked: 0,
                            },
                            {
                              id: 218,
                              pid: 214,
                              name: "风险发现停止扫描",
                              checked: 0,
                            },
                            {
                              id: 219,
                              pid: 214,
                              name: "风险发现扫描进度",
                              checked: 0,
                            },
                            {
                              id: 220,
                              pid: 214,
                              name: "风险发现扫描项目",
                              checked: 0,
                            },
                            {
                              id: 221,
                              pid: 214,
                              name: "风险发现扫描报告",
                              checked: 0,
                            },
                            {
                              id: 222,
                              pid: 214,
                              name: "风险发现明码显示",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 223,
                          pid: 81,
                          name: "风险发现用户名字典管理",
                          checked: 0,
                          children: [
                            {
                              id: 224,
                              pid: 223,
                              name: "风险发现用户名字典列表",
                              checked: 0,
                            },
                            {
                              id: 225,
                              pid: 223,
                              name: "风险发现添加用户名自定义字典",
                              checked: 0,
                            },
                            {
                              id: 226,
                              pid: 223,
                              name: "风险发现删除用户名自定义字典",
                              checked: 0,
                            },
                          ],
                        },
                        {
                          id: 227,
                          pid: 81,
                          name: "风险发现密码字典管理",
                          checked: 0,
                          children: [
                            {
                              id: 228,
                              pid: 227,
                              name: "风险发现密码字典列表",
                              checked: 0,
                            },
                            {
                              id: 229,
                              pid: 227,
                              name: "风险发现添加密码自定义字典",
                              checked: 0,
                            },
                            {
                              id: 230,
                              pid: 227,
                              name: "风险发现删除密码自定义字典",
                              checked: 0,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 100,
                  pid: 59,
                  name: "统计搜索",
                  checked: 0,
                },
                {
                  id: 101,
                  pid: 59,
                  name: "模块资产列表",
                  checked: 0,
                  children: [
                    {
                      id: 102,
                      pid: 101,
                      name: "模块非活跃资产列表",
                      checked: 0,
                    },
                    {
                      id: 103,
                      pid: 101,
                      name: "模块活跃资产列表",
                      checked: 0,
                    },
                    {
                      id: 104,
                      pid: 101,
                      name: "模块关联资产",
                      checked: 0,
                    },
                    {
                      id: 105,
                      pid: 101,
                      name: "模块删除资产",
                      checked: 0,
                    },
                  ],
                },
              ],
            },
            {
              id: 84,
              pid: 1,
              name: "平台日志",
              checked: 0,
              children: [
                {
                  id: 85,
                  pid: 84,
                  name: "操作日志",
                  checked: 0,
                },
                {
                  id: 86,
                  pid: 84,
                  name: "异常日志",
                  checked: 0,
                },
                {
                  id: 309,
                  pid: 84,
                  name: "登录日志",
                  checked: 0,
                },
              ],
            },
          ],
        },
      ],
      treeObj: [] as any[],
    });

    const isNav = (treeData: any[]) => {
      for (let i = 0; i < treeData.length; i++) {
        let item = treeData[i];
        item.checked = !!item.checked;
        item.indeterminate = false;
        item.isShow = false;
        if (!dataInfo.treeObj[item.id]) {
          dataInfo.treeObj[item.id] = item;
        }
        if (item.children) {
          item.isNav = true;
          isNav(item.children);
        }
      }
    };
    const clickOne = () => {
      getCheckedKeys(dataInfo.treeData)
    }
    const getCheckedKeys = (data: any) => {
      data.forEach((item: any) => {
        // @ts-ignore
        if (dataInfo.treeData[0].indeterminate == false) {
          dataInfo.checkedKeys.push(item.id)
          if (item.children) {
            getCheckedKeys(item.children)
          }
        } else {
          console.log(item, "????????");
          if (item.checked) dataInfo.checkedKeys.push(item.id)
          if (item.children && item.children.length !== 0) {
            getCheckedKeys(item.children)
          }
        }
      })
      dataInfo.checkedKeys = [...new Set(dataInfo.checkedKeys)]
      console.log(dataInfo.checkedKeys, "checkedKeys");

    }
    onMounted(() => {
      isNav(dataInfo.treeData);
    });

    return { ...toRefs(dataInfo), clickOne, };
  },
});
</script>
<style lang="less" scoped>
.role-content {
  height:80vh;
  padding-bottom: 100px;
  overflow: auto;
}
</style>
