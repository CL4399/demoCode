type AxiosApis<T extends string> = Record<T, any>
let apis:AxiosApis<string>={
  a:{ url:'13456'},
  b:{ url:'13456'},
} 

const api: any = {} as any
for (const key in apis) {
    if (Object.prototype.hasOwnProperty.call(apis, key)) {
      const config = apis[key]
      console.log(config)
  
    }
  }