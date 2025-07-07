# Tích hợp microfrontend

## Lấy thông tin app  (staging)
- Vào sigma portal: https://dev-streaming.gviet.vn:8783/portal (dùng tài khoản admin)
- Chọn app cần tích hợp
- Vào App Management
- Copy thông tin app: 
  - ID (1)
  - AppID (2)
  - Secret (3)

https://www.loom.com/share/3d3e6ba530fe448cb19e27ce9ac1a2d7?sid=a3e32434-360e-4765-8c11-d79e7bca1575


## Tích hợp microfrontend

### Danh sách Apps
| App | Path |
|-----|------|
| SSAI | https://dev-streaming.gviet.vn:8783/micro/cms/ssai/ |
| LRM | https://dev-streaming.gviet.vn:8783/micro/cms/lrm/ |
| Library | https://dev-streaming.gviet.vn:8783/micro/cms/library/ |
| Transcode | https://dev-streaming.gviet.vn:8783/micro/cms/transcode-live/ |
| Playout | https://dev-streaming.gviet.vn:8783/micro/cms/playout/ |
| Machine | https://dev-streaming.gviet.vn:8783/micro/cms/machine/ |
| Management | https://dev-streaming.gviet.vn:8783/micro/cms/management/ |
| Interactive | https://dev-streaming.gviet.vn:8783/micro/cms/interactive/ |
| Livestream | https://dev-streaming.gviet.vn:8783/micro/cms/livestream/ |
| VOD | https://dev-streaming.gviet.vn:8783/micro/cms/vod/ |
| App Hub | https://dev-streaming.gviet.vn:8783/micro/app/cms/hub/ |
| Vast Control | https://dev-streaming.gviet.vn:8783/micro/app/cms/vast-control/ |

## Lấy thông tin cần thiết
- Lấy thông tin **APP_URL**: Chọn app cần tích hợp để lấy path tương ứng từ danh sách Apps
- Lấy thông tin **TOKEN**: x-backdoor tạo với (2) (3) theo hướng dẫn của backend
- Lấy thông tin **APP_ID**: ID từ (1)


### Cấu hình và sử dụng micro-app
- Install package: @micro-zoe/micro-app
  `npm install @micro-zoe/micro-app`

- Cấu hình micro-app
```javascript
// lrm.jsx
import microApp from '@micro-zoe/micro-app'
import { useEffect, useState } from 'react'

const name = 'lrm'
// lấy path tương ứng từ Danh sách Apps
const APP_URL = 'https://dev-streaming.gviet.vn:8783/micro/cms/lrm/'


function LRM() {

  const [data, setData] = useState({
    footer: false,
    rightMenu: false,
    isDark: false,
    token: TOKEN, // x-backdoor generated from (2) (3)
    tokenProp: 'x-backdoor',
    appId: APP_ID // ID from (1)
  })
  

  useEffect(() => {
    microApp.forceSetData(name, data, (res) => {
      console.log(res)
    })
  }, [data])

  return (
    <micro-app name={name} url={APP_URL} data={data} />
  )
}

export default LRM 

```
### Example
https://repo.gviet.vn:1443/sondh/vite-micro-app/-/blob/master/src/pages/LRM.jsx


### Sử dụng micro-app
```javascript

import microApp from '@micro-zoe/micro-app'
import { useEffect, useState } from 'react'
import LRM from '../pages/LRM'
import LoadingMicro from './LoadingMicro'

export default function MicroApp() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!microApp.hasInit) {
      microApp.start({
        inline: false,
        destroy: true,
        disableScopecss: true,
        disableSandbox: false,
        shadowDOM: false,
        ssr: false,
        iframe: true,
      })
    }

    

    return () => {
      microApp.unmountAllApps({ destroy: true })
    }
  }, [])

  return (
    <div className='relative h-full w-full overflow-hidden'>
      <LoadingMicro />
      <LRM/>
    </div>
  )
}

```
### Example
https://repo.gviet.vn:1443/sondh/vite-micro-app/-/blob/master/src/components/MicroApp.jsx




