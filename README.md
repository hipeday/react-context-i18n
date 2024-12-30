# Rosen react i18n

> 基于React Context的i18n解决方案 因为使用`nextjs`之后无法静态导出衍生出的解决方案. 所以如果你的项目需要使用`nextjs`服务端功能请不要使用该库。

## 快速开始

### 使用准备

- 下载依赖

```bash
yarn add rosen-react-i18n
```

### 配置 & 使用

#### 创建 i18n 翻译

>  src/locales/zh-CN.json

```json
{
  "pages": {
    "signin": {
      "welcome": "欢迎登录",
    }
  }
}
```

#### 使用

> src/pages/_app.tsx

```typescript
import { AppProps } from "next/app";
import { LanguageProvider } from 'rosen-react-i18n'; // 导入 LanguageProvider

export default function App({ Component, pageProps }: AppProps) {

  return (
    // 使用组件
    <LanguageProvider
      // 默认语言
      locale='zh-CN' 

      // 加载语言对应翻译文件 该函数在切换语言时出发(调用 useLanguage().setLocale这个hooks时触发)
      loadMessages={async (locale) => {
        return (await import(`../locales/${locale}.json`)).default
      }}
    >
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
```

> src/components/LanguageSwitcher.tsx

```typescript
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { Dropdown, MenuButton, Box, Menu, MenuItem } from '@mui/joy'
import { type LocaleType, useLanguage } from 'rosen-react-i18n';


const locales = {
  'en-US': 'English',
  'zh-CN': '简体中文'
}

export default function LanguageSwitcher() {
  const { currentLocale, setLocale } = useLanguage();

  return (
    <Box>
      <Dropdown>
        <MenuButton
          variant='plain'  // 设置按钮样式
          startDecorator={<GTranslateIcon />}  // 在按钮左侧添加图标
        >
          {locales[currentLocale as keyof typeof locales]}
        </MenuButton>
        {/* 下拉菜单 */}
        <Menu>
        {Object.keys(locales).map((key) => (
          <MenuItem
            key={key}
            onClick={async () => {
              if (key === currentLocale) return
              setLocale(key as LocaleType)
            }}
          >
            {locales[key as keyof typeof locales]}
          </MenuItem>
        ))}
        </Menu>
      </Dropdown>
    </Box>
  )
} 
```

## Example

Rosen的默认主题插件 [Haku](https://github.com/hipeday/rosen-haku-theme) 就是使用该插件实现了 `i18n`。 也建议您如果希望开发自己的 `Rosen主题插件` 的话，需要`i18n`可以考虑该插件。

