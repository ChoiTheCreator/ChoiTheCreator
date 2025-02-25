import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `# 반갑습니다 👋

## 🧑🏻‍💻 Languages

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/>
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> 
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> 
  <img src="https://img.shields.io/badge/Java-5382A1?style=flat-square&logo=openjdk&logoColor=white"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white"/> <!-- Python 추가 -->
</p>

## 📘 Frameworks & Libraries

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=Vue.js&logoColor=white"/>
</p>

## 🪮 Styling Tools

<p>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/> <!-- CSS 추가 -->
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>
  <img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/>
  <img src="https://img.shields.io/badge/Styled Components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
</p>

## 🛠️ IDEs & Development Tools

<p>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>
    <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white"/>
  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/>
  <img src="https://img.shields.io/badge/RStudio-75AADB?style=flat-square&logo=RStudio&logoColor=white"/>
</p>

---


## 📕 Latest Blog Posts

`;

const pinnedPosts = [
  {
    title: '📌 Project : Wallet Guardians, 최종 회고록',
    link: 'https://wonbin109.tistory.com/111',
  },
];

// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
  },
});

// 고정된 글 먼저 추가
pinnedPosts.forEach(({ title, link }) => {
  text += `<a href="${link}">${title}</a></br>`;
});

(async () => {
  // 피드 목록
  const feed = await parser.parseURL('https://wonbin109.tistory.com/rss');

  // 최신 8개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 7; i++) {
    const { title, link } = feed.items[i];
    console.log(`${i + 1}번째 게시물`);
    console.log(`추가될 제목: ${title}`);
    console.log(`추가될 링크: ${link}`);
    text += `<a href=${link}>${title}</a></br>`;
  }

  // README.md 파일 작성
  writeFileSync('README.md', text, 'utf8', (e) => {
    console.log(e);
  });

  console.log('업데이트 완료');
})();
