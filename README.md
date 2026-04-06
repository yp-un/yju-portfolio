# [yju-portfolio](https://yju-portfolio.com)

### 웹으로 제작한 Frontend 포트 폴리오

###### 2025.01

###### 1인 프로젝트

## 📌 Summary

프론트엔드 개발자로서 역량을 효과적으로 보여줄 수 있는 방법을 고민한 끝에, 웹사이트 형태의 포트폴리오를 제작

- Next.js 로 SEO 에 유리
  - 구글, 네이버에 [‘양정운 포트폴리오’, ‘개발자 양정운’, ‘프론트 양정운’] 검색 시 1면 1열에 배치

    ![검색 화면 캡쳐 이미지](https://yju-portfolio.com/portfolio/search.webp)

- SCSS 로 효율적이고, 유지보수에 유리한 스타일링
  - 공통되는 스타일을 ‘mixin’ 으로 재사용성을 높임

  - 로딩 애니메이션의 %를 ‘for’, ‘if’ 로 하드코딩 없이 구현

  - 반복되는 변수를 ’each’ 로 하드코딩 없이 선언

- 바닐라JS 구현
  - 기본 동작 원리를 이해하기 위해 resize, scroll 등을 바닐라JS 로 구현

- Zustand 로 가볍고 빠른 상태 관리
  - 기존 사용하던 Redux 보다 보일러플레이트가 확연히 적어 npm trends에서 급부상 하고 있는 이유를 알것 같고, 가벼운 프로젝트에서 애용할 듯 하다.

  - Parallel Routes 로 띄운 모달에 상태를 공유

- 반응형
  - 데스크탑에선 skill 을 hover 시 확장에서 모바일에선 클릭 시 확장

  - prefers-color-scheme 에 따라 색상 변경

## Troubleshooting

- 주소창 숨김 이슈
  - 모바일에서 body에 스크롤이 있어야 주소창이 숨겨졌고, 다른 방법으로 숨길 수 없어서 기존 레이아웃에서 body에 스크롤이 가능한 레이아웃으로 변경

- safari 에선 background-attachment: fixed 미지원

  -기존 스크롤 시 선 색상이 바뀌는 것을 CSS 의 linear-gradient, ackground-attachment: fixed 로 구현했으나 safari 에선 background-attachment: fixed 가 안먹혀서 JavaScript로 구현

- 네이버 검색에선 favicon이 안뜨는 이슈.
  - public 디렉토리에 favicon을 복사

  - public 디렉토리에 robots.txt

    ```
    User-agent: \*
    Allow: /
    ```

    - 둘 중 어떤 것 때문이었는지 알기위해 app 의 favicon 을 vercel favicon 으로 변경하고, public 의 favicon 을 제거해봄 -> 네이버 크롤링 봇이 반영하는데 1~2주 정도 걸린다 하니 확인 후 readme 업데이트 해야겠다.

    - 위 방법 적용후 1달이 이후 favicon 변경 상황
      - 구글 custom favicon -> vercel favicon
      - 네이버 custom favicon -> custom favicon

      favicon 이 변경되지 않아, 반대로 public 디렉토리에 favicon(vercel 기본)을 복사 해두고, robots.txt 를 삭제해봐야겠다.

      naver 검색 목록에서 사라짐 -> 공식문서에 따라 app 하위에 favicon과 robots.txt 를 위치시킴

- [h1 태그 SEO 개선](https://velog.io/@yp071704/h1h6-태그의-중요성)

## 🔨 Technology Stack(s)

| Stack                                                                                                 | Version   | etc.       |
| ----------------------------------------------------------------------------------------------------- | --------- | ---------- |
| <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=white">       | `15.1.11` | App Router |
| <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=black">           | `19.0.0`  |
| <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"> | `5`       |
| <img src="https://img.shields.io/badge/Sass-CC6699?style=flat&logo=Sass&logoColor=white">             | `1.83.3`  |

## ⚙️ Setup & Usage

```bash
# Install Packages
npm install

# Run Frontend Server
npm run dev
```
