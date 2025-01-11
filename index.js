import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `# 반갑습니다. 최원빈입니다. 👋

## Languages

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> 
  <img src="https://img.shields.io/badge/Java-5382A1?style=flat-square&logo=openjdk&logoColor=white"/> <!-- Java 로고 변경 -->
</p>

## Frameworks & Libraries

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=Vue.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>
</p>

## Styling Tools

<p>
  <img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/>
  <img src="https://img.shields.io/badge/Styled Components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
</p>

## Tools

<p>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>
  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/>
  <img src="https://img.shields.io/badge/RStudio-75AADB?style=flat-square&logo=RStudio&logoColor=white"/> <!-- R Studio 추가 -->
</p>

---

<p>아래는 최근 블로그 포스트입니다. 새로운 기술과 스스로의 개발 경험 및 영화 평론과 영화 제작 등을 공유하고 있습니다!</p>

## 📕 Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  // 피드 목록
  const feed = await parser.parseURL("https://wonbin109.tistory.com/rss"); #본인 rss 주소

  // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 5; i++) {
    const { title, link } = feed.items[i];
    console.log(`${i + 1}번째 게시물`);
    console.log(`추가될 제목: ${title}`);
    console.log(`추가될 링크: ${link}`);
    text += `<a href=${link}>${title}</a></br>`;
  }

  // README.md 파일 작성
  writeFileSync("README.md", text, "utf8", (e) => {
    console.log(e);
  });

  console.log("업데이트 완료");
})();